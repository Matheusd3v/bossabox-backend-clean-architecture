import { NotFoundError } from "@presentation/Errors/notFound.error";
import ToolRepository from "../repositories/tool.repository";

export default class GetToolsByTag {
    constructor(private readonly repository: ToolRepository) {}

    public async exec(tag: string) {
        const tools = await this.repository.filterByTag(tag);

        if (tools.length < 1) {
            throw new NotFoundError("Not found tools with this tag");
        }

        return tools;
    }
}
