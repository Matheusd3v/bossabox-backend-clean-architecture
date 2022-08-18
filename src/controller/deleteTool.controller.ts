import DeleteTool from "../core/useCase/deleteTool.useCase";
import ToolRepositorySqlite from "../infra/repositories/sqlite/toolSQL.repository";

export default class DeleteToolController {
    static async exec(params: any) {
        const { id } = params;
        const repository = new ToolRepositorySqlite();
        const deleteTool = new DeleteTool(repository);
        await deleteTool.exec(id);

        return {};
    }
}
