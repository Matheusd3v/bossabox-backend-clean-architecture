import { ILike } from "typeorm";

import ToolAdapter from "../../../adapter/toolAdapter";
import Tool from "../../../core/entities/tools";
import toolsDTO from "../../../core/entities/toolsDTO";
import ToolRepository from "../../../core/repositories/tool.repository";
import database from "../../database/data-source";
import Tools from "../../database/entities/Tools";

export default class ToolRepositorySqlite implements ToolRepository {
    public async saveTool(toolDatas: toolsDTO): Promise<Tool> {
        const tagsJoined = toolDatas.tags.join(",");
        const dataToSave = { ...toolDatas, tags: tagsJoined };

        const { id, link, description, tags, title } =
            await database.manager.save(Tools, dataToSave);

        const tagsArr = tags.split(",");

        return ToolAdapter.create(id, title, description, link, tagsArr);
    }

    public async getToolById(id: number): Promise<Tool> {
        const tool = await database.manager.findOne(Tools, { where: { id } });

        if (!tool) {
            throw new Error("Tool not found");
        }

        const tag = tool.tags.split(",");

        return ToolAdapter.create(
            tool.id,
            tool.title,
            tool.description,
            tool.link,
            tag
        );
    }

    public async getAllTools(): Promise<Tool[]> {
        const tools = await database.manager.find(Tools);

        const formatTags = tools.map((tool) => {
            const tags = tool.tags.split(",");

            return { ...tool, tags };
        });

        return formatTags.map((tool) =>
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

        const formatTags = tools.map((tool) => {
            const tags = tool.tags.split(",");

            return { ...tool, tags };
        });

        return formatTags.map((tool) =>
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
