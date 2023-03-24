import GetAllTools from "@core/useCase/getAllTools.useCase";
import GetToolsByTag from "@core/useCase/getToolsByTag.useCase";
import ToolRepositorySql from "@infra/repositories/sql/toolSQL.repository";

export default class RetrieveAllToolsController {
    static async exec(_: any, __: any, qs: any) {
        const { tag } = qs;
        const repository = new ToolRepositorySql();

        if (tag) {
            const getTagedTools = new GetToolsByTag(repository);
            const toolsWithTag = await getTagedTools.exec(tag);

            return { statusCode: 200, obj: toolsWithTag };
        }

        const getTools = new GetAllTools(repository);
        const tools = await getTools.exec();

        return { statusCode: 200, obj: tools };
    }
}
