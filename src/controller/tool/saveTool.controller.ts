import SaveTool from "@core/useCase/saveTool.useCase";
import ToolRepositorySql from "@infra/repositories/sql/toolSQL.repository";

export default class SaveToolController {
    static async exec(_: any, body: any) {
        const repository = new ToolRepositorySql();
        const saveTool = new SaveTool(repository);
        const toolSaved = await saveTool.exec(body);

        return { statusCode: 201, obj: toolSaved };
    }
}
