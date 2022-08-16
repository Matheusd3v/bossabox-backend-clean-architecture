export default class Tool {
    id?: number;
    title: string;
    link: string;
    description: string;
    tags: string[];

    constructor(title: string, link: string, description: string, tags: string[], id?: number) {
        this.title = title
        this.link = link
        this.description = description
        this.tags = tags
        this.id = id
    }
}