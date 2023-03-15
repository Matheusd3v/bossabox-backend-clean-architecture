import GetTool from "../core/useCase/getTool.useCase";
import ToolRepositorySqlite from "../infra/repositories/sql/toolSQLite.repository";

export default class RetrieveToolController {
    static async exec(params: any) {
        const { id } = params;
        const repository = new ToolRepositorySqlite();
        const getTool = new GetTool(repository);
        const tool = await getTool.exec(id);

        return { statusCode: 200, obj: tool };
    }
}
