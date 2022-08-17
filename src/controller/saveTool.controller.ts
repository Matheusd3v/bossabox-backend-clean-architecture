import SaveTool from "../core/useCase/saveTool.useCase";
import ToolRepositoryMemory from "../infra/repositories/in-memory/tool.repository";

export default class SaveToolController {
    static async exec(_: any, body: any) {
        const repository = new ToolRepositoryMemory();
        const saveTool = new SaveTool(repository);
        const toolSaved = await saveTool.exec(body);

        return toolSaved;
    }
}
