import ToolAdapter from "../../../core/adapter/toolAdapter";
import Tool from "../../../core/entities/tools";
import ToolDTO from "../../../core/entities/toolsDTO";
import ToolRepository from "../../../core/repositories/tool.repository";

export default class ToolRepositoryMemory implements ToolRepository {
    private toolsDB: ToolDTO[] = [];
    private lastId = 0

    public async saveTool({ description, link, tags, title }: ToolDTO): Promise<void> {
        this.lastId += 1
        const id = this.lastId 
        this.toolsDB.push({ id, link, tags, title, description })
    }

    public async getToolById(id: number): Promise<Tool> {
        const data = this.toolsDB.find(tool => tool.id === id)

        const tool = data
            ? ToolAdapter.create(data.id as number, data.title, data.description, data.link, data.tags) 
            : {} as Tool

        return tool
    }
}