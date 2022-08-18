import GetAllTools from "../core/useCase/getAllTools.useCase";
import ToolRepositorySqlite from "../infra/repositories/sqlite/toolSQL.repository";

export default class RetrieveAllToolsController {
    static async exec() {
        const repository = new ToolRepositorySqlite();
        const getTools = new GetAllTools(repository);
        const tools = await getTools.exec();

        return tools;
    }
}
