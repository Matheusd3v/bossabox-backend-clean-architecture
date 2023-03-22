import Tool from "../entities/tools";
import { ToolDto } from "../../presentation/dto";

export default interface ToolRepository {
    saveTool(toolDatas: ToolDto): Promise<Tool>;
    getToolById(id: number): Promise<Tool>;
    getAllTools(): Promise<Tool[]>;
    filterByTag(tag: string): Promise<Tool[]>;
    deleteTool(id: number): Promise<void>;
    alreadyExists(name: string): Promise<boolean>;
}
