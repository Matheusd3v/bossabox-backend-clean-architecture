import Tool from "../core/entities/tools";

export default class ToolAdapter {
    static create(
        id: number,
        title: string,
        description: string,
        link: string,
        tags: string[]
    ) {
        return new Tool(title, link, description, tags, id);
    }
}
