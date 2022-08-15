import Tool from "../entities/tools";

export default interface ToolRepository {
    saveTool(toolDatas: Tool): Promise<void>
    getToolById(id: string): Promise<Tool>
}