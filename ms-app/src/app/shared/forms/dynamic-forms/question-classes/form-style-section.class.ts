export class StyleSection<T> {
    order: number;
    controlType: string;
    content: string;
    title: string;
    class: string;
    divider: boolean;

    constructor(
        options: {
            order?: number;
            controlType?: string;
            content?: string;
            title?: string;
            class?: string;
            divider?: boolean;
        } = {}
    ) {
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || 'style';
        this.content = options.content || '';
        this.title = options.title || '';
        this.class = options.class || '';
        this.divider = options.divider === undefined ? false : options.divider;
    }
}