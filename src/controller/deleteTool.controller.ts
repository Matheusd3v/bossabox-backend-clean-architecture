import DeleteTool from "../core/useCase/deleteTool.useCase";
import ToolRepositorySql from "../infra/repositories/sql/toolSQL.repository";

export default class DeleteToolController {
    static async exec(params: any) {
        const { id } = params;
        const repository = new ToolRepositorySql();
        const deleteTool = new DeleteTool(repository);
        await deleteTool.exec(id);

        return { statusCode: 200, obj: {} };
    }
}
