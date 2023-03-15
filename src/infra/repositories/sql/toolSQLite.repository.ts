import { ILike } from "typeorm";

import ToolAdapter from "../../../adapter/toolAdapter";
import Tool from "../../../core/entities/tools";
import toolsDTO from "../../../core/entities/toolsDTO";
import ToolRepository from "../../../core/repositories/tool.repository";
import { NotFoundError } from "../../../presentation/Errors/notFound.error";
import database from "../../database/data-source";
import Tools from "../../database/entities/Tools";

export default class ToolRepositorySqlite implements ToolRepository {
    public async alreadyExists(name: string): Promise<boolean> {
        const tool = await database.manager.findOne(Tools, { where: { title: ILike(name) } });

        return Boolean(tool)
    }


    public async saveTool(toolDatas: toolsDTO): Promise<Tool> {
        const { id, link, description, tags, title } =
            await database.manager.save(Tools, toolDatas);

        return ToolAdapter.create(id, title, description, link, tags);
    }

    public async getToolById(id: number): Promise<Tool> {
        const tool = await database.manager.findOne(Tools, { where: { id } });

        if (!tool) {
            return {} as Tool
        }

        return ToolAdapter.create(
            tool.id,
            tool.title,
            tool.description,
            tool.link,
            tool.tags
        );
    }

    public async getAllTools(): Promise<Tool[]> {
        const tools = await database.manager.find(Tools);

        return tools.map((tool) =>
            ToolAdapter.create(
                tool.id,
                tool.title,
                tool.description,
                tool.link,
                tool.tags
            )
        );
    }

    public async filterByTag(tag: string): Promise<Tool[]> {
        const tools = await database.manager.findBy(Tools, {
            tags: ILike(`%${tag}%`),
        });

        return tools.map((tool) =>
            ToolAdapter.create(
                tool.id,
                tool.title,
                tool.description,
                tool.link,
                tool.tags
            )
        );
    }

    public async deleteTool(id: number): Promise<void> {
        await database.manager.delete(Tools, id);
    }
}
