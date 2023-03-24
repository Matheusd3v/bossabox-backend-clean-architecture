import Tool from "../entities/tools";
import { ToolDto, UpdateToolDto } from "@presentation/dto";

export default interface ToolRepository {
    saveTool(toolDatas: ToolDto): Promise<Tool>;
    getToolById(id: number): Promise<Tool>;
    getAllTools(): Promise<Tool[]>;
    filterByTag(tag: string): Promise<Tool[]>;
    deleteTool(id: number): Promise<void>;
    alreadyExists(name: string): Promise<boolean>;
    updateToolById(id: number, toolUpdated: UpdateToolDto): Promise<Tool>
}
