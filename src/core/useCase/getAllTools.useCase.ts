import ToolRepository from "../repositories/tool.repository";

export default class GetAllTools {
    constructor(private readonly toolRepository: ToolRepository) {}

    public async exec() {
        const tools = await this.toolRepository.getAllTools();

        return tools;
    }
}
