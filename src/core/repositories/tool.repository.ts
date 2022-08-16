import Tool from "../entities/tools";
import ToolDTO from "../entities/toolsDTO";
export default interface ToolRepository {
    saveTool(toolDatas: ToolDTO): Promise<void>
    getToolById(id: number): Promise<Tool>
}