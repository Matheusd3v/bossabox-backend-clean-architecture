import ToolRepository from "../repositories/tool.repository";

export default class DeleteTool {
    constructor(private readonly repository: ToolRepository) {}

    public async exec(id: number) {
        const tool = await this.repository.getToolById(id);

        if (!tool.id) {
            throw new Error("Tool not found");
        }

        await this.repository.deleteTool(id);
    }
}
