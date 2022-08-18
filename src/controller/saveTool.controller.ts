import SaveTool from "../core/useCase/saveTool.useCase";
import ToolRepositorySqlite from "../infra/repositories/sqlite/toolSQL.repository";

export default class SaveToolController {
    static async exec(_: any, body: any) {
        const repository = new ToolRepositorySqlite();
        const saveTool = new SaveTool(repository);
        const toolSaved = await saveTool.exec(body);

        return toolSaved;
    }
}
