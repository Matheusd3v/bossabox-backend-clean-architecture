import Tool from "../entities/tools";
import ToolDTO from "../entities/toolsDTO";
export default interface ToolRepository {
    saveTool(toolDatas: ToolDTO): Promise<Tool>;
    getToolById(id: number): Promise<Tool>;
    getAllTools(): Promise<Tool[]>;
}
