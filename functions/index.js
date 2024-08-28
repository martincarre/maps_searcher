const { onRequest } = require("firebase-functions/v2/https");
const functions = require("firebase-functions");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const logger = require("firebase-functions/logger");
const { Client, PlacesNearbyRanking, PlaceType1 } = require("@googlemaps/google-maps-services-js");
const puppeteer = require('puppeteer');
const path = require('path');

const googleMaps = new Client({});
// Load environment variables from .env file in development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: path.resolve(__dirname, '.env') });
}

initializeApp();


async function getLatLng(zipCode, apiKey) {
    try {
        const response = await googleMaps.geocode({
            params: {
                address: zipCode,
                key: apiKey
            }
        });
        const results = response.data.results;
        for (const result of results) {
            const addressComponents = result.address_components;
            for (const component of addressComponents) {
                if (component.types.includes('country') && component.long_name === 'Spain') {
                    const location = result.geometry.location;
                    return { lat: location.lat, lng: location.lng };
                }
            }
        }
        throw new Error("No results found in the specified country");
    } catch (error) {
        logger.error(`Error during geocode: ${error}`);
        throw error;
    }
}

// Function to search for businesses
async function searchBusiness(lat, lng, selectedType, keyword, apiKey) {
    const params = {
        location: { lat, lng },
        rankby: PlacesNearbyRanking.distance,
        type: PlaceType1[selectedType],
        keyword: keyword,
        key: apiKey
    };

    try {
        const response = await googleMaps.placesNearby({ params });
        return response.data.results;
    } catch (error) {
        logger.error(`Error during placesNearby search: ${error}`);
        throw error;
    }
}

// Function to get details of each business
async function getBusinessDetails(placeId, apiKey) {
    try {
        const response = await googleMaps.placeDetails({
            params: {
                place_id: placeId,
                key: apiKey
            }
        });
        return response.data.result;
    } catch (error) {
        logger.error(`Error during placeDetails: ${error}`);
        throw error;
    }
}

// Function to scrape emails and NIF/CIF from website
async function scrapeContactInfo(website) {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(website, { waitUntil: 'domcontentloaded' });

        // Extract emails from mailto links
        const mailtoLinks = await page.$$eval('a[href^="mailto:"]', links => links.map(link => link.href.match(/mailto:(.*)/)[1]));
        const emails = [...new Set(mailtoLinks)]; // Remove duplicates

        // Additional email extraction from page content
        const content = await page.content();
        const emailMatches = content.match(/[\w\.-]+@[\w\.-]+/g);
        if (emailMatches) {
            emailMatches.forEach(email => {
                if (!emails.includes(email)) {
                    emails.push(email);
                }
            });
        }

        // Extract NIF/CIF with a flexible pattern
        let nifCif = null;
        const nifCifPattern = /\b([A-HJNP-SUVW][ -.]?[0-9]{1,2}[ -.]?[0-9]{3}[ -.]?[0-9]{3}[ -.]?[0-9A-J]|[0-9]{8}[A-Z])\b/g;
        const nifCifMatches = content.match(nifCifPattern);
        if (nifCifMatches) {
            nifCif = nifCifMatches[0].replace(/[\s.-]/g, '').trim(); // Remove spaces, dots, and hyphens, and trim the string
        }

        // Check for 'aviso-legal' page for additional details
        const legalLinks = await page.$$eval('a', links => links.map(link => link.href).filter(href => href.includes('aviso-legal')));
        if (legalLinks.length > 0) {
            await page.goto(legalLinks[0], { waitUntil: 'domcontentloaded' });
            const legalContent = await page.content();
            const legalNifCifMatches = legalContent.match(nifCifPattern);
            if (legalNifCifMatches) {
                nifCif = legalNifCifMatches[0].replace(/[\s.-]/g, '').trim(); // Remove spaces, dots, and hyphens, and trim the string
            }

            const legalEmailMatches = legalContent.match(/[\w\.-]+@[\w\.-]+/g);
            if (legalEmailMatches) {
                legalEmailMatches.forEach(email => {
                    if (!emails.includes(email)) {
                        emails.push(email);
                    }
                });
            }
        }

        await browser.close();
        return { emails, nifCif };
    } catch (error) {
        console.error(`Error scraping ${website}:`, error);
        return { emails: [], nifCif: null };
    }
}

// HTTP function to trigger the script
exports.findBusinesses = onRequest(async (req, res) => {
    const zipCode = req.query.zip || '28020';
    const businessType = req.query.type || 'pharmacy';
    const keyword = req.query.keyword || 'Farmacia';
    const apiKey = process.env.NODE_ENV === 'production' ? functions.config().google.api_key : process.env.GOOGLE_API_KEY;
    const dbCollection = getFirestore().collection(businessType);


    try {
        const { lat, lng } = await getLatLng(zipCode, apiKey);
        const businesses = await searchBusiness(lat, lng, businessType, keyword ,apiKey);

        // Function to handle scraping and details fetching concurrently
        const handleBusinessDetails = async (business) => {
            
            // First search firestore for the business. If it exists, return it to a const 
            const doc = await dbCollection.doc(business.place_id).get();
            // if it exists and the document was created less than 3 months ago, return the document data:
            if (doc.exists && new Date(doc.createTime._seconds * 1000) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)) {
                return doc.data();
            }

            //  continue with the scraping and details fetching
            const details = await getBusinessDetails(business.place_id, apiKey);
            const website = details.website ? details.website : null;
            let emails = [];
            let nifCif = null;

            if (website) {
                const contactInfo = await scrapeContactInfo(website);
                emails = contactInfo.emails;
                nifCif = contactInfo.nifCif;
            }
            const businessData = {
                name: details.name,
                address: details.formatted_address,
                phone_number: details.formatted_phone_number ? details.formatted_phone_number : null,
                website: website,
                emails: emails,
                nif_cif: nifCif
            };
            // If there's a existing old (over 3 months old) document in firestore, compare the information stored and the one fetched
            const sameData = JSON.stringify(businessData) === JSON.stringify(doc.data());
            // If there's a difference, update the document in firestore with the new information
            if (!sameData) {
                await dbCollection.doc(business.place_id).set({...businessData,});
            }
            // If there's no difference, continue with the next business

            // If there's no existing document in firestore, create a new document with the fetched information with the business.place_id as the document id
            if (!doc.exists) {
                await dbCollection.doc(business.place_id).set({...businessData,});
            }

            return businessData;            
        };


        // Perform all scraping and details fetching concurrently
        const businessDetails = await Promise.all(businesses.map(handleBusinessDetails));

        // Save the results to firestore
        

        res.json({ businesses: businessDetails });

        return 0;
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("An error occurred");
    }
});

