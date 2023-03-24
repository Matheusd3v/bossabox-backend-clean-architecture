import GetTool from "@core/useCase/getTool.useCase";
import ToolRepositorySql from "@infra/repositories/sql/toolSQL.repository";

export default class RetrieveToolController {
    static async exec(params: any) {
        const { id } = params;
        const repository = new ToolRepositorySql();
        const getTool = new GetTool(repository);
        const tool = await getTool.exec(id);

        return { statusCode: 200, obj: tool };
    }
}
