import ToolAdapter from "../../../adapter/toolAdapter";
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
    }: ToolDTO): Promise<Tool> {
        this.lastId += 1;
        const id = this.lastId;

        const tool = { id, link, tags, title, description };
        this.toolsDB.push(tool);

        return ToolAdapter.create(id, title, description, link, tags);
    }

    public async getToolById(id: number): Promise<Tool> {
        const tool = this.toolsDB.find((tool) => tool.id === id);

        if (tool) {
            return ToolAdapter.create(
                tool.id as number,
                tool.title,
                tool.description,
                tool.link,
                tool.tags
            );
        }

        return {} as Tool;
    }

    public async getAllTools(): Promise<Tool[]> {
        if (this.toolsDB.length < 1) {
            return [];
        }

        const serialized = this.toolsDB.map((tool) => {
            return ToolAdapter.create(
                tool.id as number,
                tool.title,
                tool.description,
                tool.link,
                tool.tags
            );
        });

        return serialized;
    }

    public async filterByTag(tag: string): Promise<Tool[]> {
        const tools = this.toolsDB.filter((tool) => tool.tags.includes(tag));

        return tools;
    }

    public async deleteTool(id: number): Promise<void> {
        const index = this.toolsDB.findIndex((tool) => tool.id === id);

        const newDB = this.toolsDB.filter((tool, idx) => idx !== index);

        this.toolsDB = newDB;
    }
}
