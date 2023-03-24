import { ToolDto } from "@presentation/dto";
import { ConflictError } from "@presentation/Errors/conflict.error";
import ToolRepository from "../repositories/tool.repository";

export default class SaveTool {
    constructor(private readonly toolRepository: ToolRepository) {}

    public async exec(toolDatas: ToolDto) {

        const alreadyExists = await this.toolRepository.alreadyExists(
            toolDatas.title
            .trim()
            .toLocaleLowerCase()
        )

        if (alreadyExists) {
            throw new ConflictError("Tool title already exists.");
        }

        return this.toolRepository.saveTool(toolDatas);
    }
}
