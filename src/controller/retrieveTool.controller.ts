import GetTool from "../core/useCase/getTool.useCase";
import ToolRepositorySqlite from "../infra/repositories/sqlite/toolSQL.repository";

export default class RetrieveToolController {
    static async exec(params: any) {
        const { id } = params;
        const repository = new ToolRepositorySqlite();
        const getTool = new GetTool(repository);
        const tool = await getTool.exec(id);

        return tool;
    }
}
