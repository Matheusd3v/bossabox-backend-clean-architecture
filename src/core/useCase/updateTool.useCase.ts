import { UpdateToolDto } from "../../presentation/dto";
import { ConflictError } from "../../presentation/Errors";
import Tool from "../entities/tools";
import ToolRepository from "../repositories/tool.repository";

export default class UpdateTool {
    constructor(private readonly repository: ToolRepository) {}

    public async exec(id: number, toolDataUpdated: UpdateToolDto) {
        if (toolDataUpdated.title) {
            await this.verifyExistentTitle(toolDataUpdated.title)
        }

        return this.repository.updateToolById(id, toolDataUpdated)
    }

    private async verifyExistentTitle(title: string) {
        const alreadyExists = await this.repository.alreadyExists(title)

        if (alreadyExists) {
            throw new ConflictError('Title name already exists.')
        }
    }
}