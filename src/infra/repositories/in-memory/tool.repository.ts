import ToolAdapter from "../../../adapter/toolAdapter";
import Tool from "../../../core/entities/tools";
import ToolRepository from "../../../core/repositories/tool.repository";
import { ToolDto, UpdateToolDto } from "../../../presentation/dto";
import { NotFoundError } from "../../../presentation/Errors";

export default class ToolRepositoryMemory implements ToolRepository {
    private toolsDB: Tool[] = [];
    private lastId = 0;
    
    public async alreadyExists(title: string): Promise<boolean> {
        return this.toolsDB.some(tool => {
            return tool.title.toLocaleLowerCase() === title
        })
    }

    public async saveTool({
        description,
        link,
        tags,
        title,
    }: ToolDto): Promise<Tool> {
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
        const newDB = this.toolsDB.filter((_tool, idx) => idx !== index);

        this.toolsDB = newDB;
    }

    public async updateToolById(id: number, toolUpdated: UpdateToolDto): Promise<Tool> {
        const index = this.toolsDB.findIndex((tool) => tool.id === id);   

        if (index < 0) throw new NotFoundError(`Not Found Tool Id`)

        const oldTool = this.toolsDB[index]     
        this.toolsDB.splice(index, 1, { ...oldTool, ...toolUpdated })

        return this.toolsDB[index]
    }
}
