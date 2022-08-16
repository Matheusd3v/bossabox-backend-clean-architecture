import Tool from "../../../core/entities/tools";
import ToolDTO from "../../../core/entities/toolsDTO";
import ToolRepository from "../../../core/repositories/tool.repository";

export default class ToolRepositoryMemory implements ToolRepository {
    private toolsDB: ToolDTO[] = [];
    private lastId = 0;

    public async saveTool({
        description,
        link,
        tags,
        title,
    }: ToolDTO): Promise<void> {
        this.lastId += 1;
        const id = this.lastId;

        const tool = { id, link, tags, title, description };
        this.toolsDB.push(tool);
    }

    public async getToolById(id: number): Promise<Tool> {
        const tool = this.toolsDB.find((tool) => tool.id === id) as Tool;

        return tool;
    }

    public async getAllTools(): Promise<Tool[]> {
        return this.toolsDB;
    }
}
