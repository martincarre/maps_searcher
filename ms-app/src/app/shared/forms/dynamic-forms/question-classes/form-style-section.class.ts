export class StyleSection<T> {
    order: number;
    controlType: string;
    content: string;
    title: string;
    class: string;
    
    constructor(
        options: {
            order?: number;
            controlType?: string;
            content?: string;
            title?: string;
            class?: string;
        } = {}
    ) {
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || 'style';
        this.content = options.content || '';
        this.title = options.title || '';
        this.class = options.class || '';
    }
}