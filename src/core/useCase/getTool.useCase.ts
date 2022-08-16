import ToolRepository from "../repositories/tool.repository";

export default class GetTool {
    constructor(private readonly toolRepository: ToolRepository) {}

    public async exec(id: number) {
        const tool = await this.toolRepository.getToolById(id);

        if (!tool) {
            throw new Error("Tool not found");
        }

        return tool;
    }
}
