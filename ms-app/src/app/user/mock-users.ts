import { AuthedUser } from "./user.interface";

export const mockAuthUsers: AuthedUser[] = [
    {
        email: 'test@test.com',
        name: 'Test Test',
        isVerified: true,
    },
    {
        email: 'test2@test.com',
        name: 'Test2 Test2',
        isVerified: false,
    },
];