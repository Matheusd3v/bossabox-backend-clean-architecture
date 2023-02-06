import ToolDTO from "../entities/toolsDTO";
import ToolRepository from "../repositories/tool.repository";

export default class SaveTool {
    constructor(private readonly toolRepository: ToolRepository) {}

    public async exec(toolDatas: ToolDTO) {
        return this.toolRepository.saveTool(toolDatas);
    }
}
