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
        const tool = await database.manager.findOneByOrFail(Tools, { id });

        const tag = tool?.tags.split(",");

        return ToolAdapter.create(
            tool.id,
            tool.title,
            tool.description,
            tool.link,
            tag
        );
    }

    getAllTools(): Promise<Tool[]> {
        throw new Error("Method not implemented.");
    }

    filterByTag(tag: string): Promise<Tool[]> {
        throw new Error("Method not implemented.");
    }

    deleteTool(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
