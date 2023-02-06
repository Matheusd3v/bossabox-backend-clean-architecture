import ToolRepository from "../repositories/tool.repository";

export default class GetAllTools {
    constructor(private readonly toolRepository: ToolRepository) {}

    public async exec() {
        return this.toolRepository.getAllTools();
    }
}
