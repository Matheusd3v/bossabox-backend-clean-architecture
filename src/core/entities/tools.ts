export default class Tool {
    title: string;
    link: string;
    description: string;
    tags: string[];

    constructor(title: string, link: string, description: string, tags: string[]) {
        this.title = title
        this.link = link
        this.description = description
        this.tags = tags
    }
}