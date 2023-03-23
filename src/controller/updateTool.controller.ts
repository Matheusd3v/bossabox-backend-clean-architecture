import UpdateTool from "../core/useCase/updateTool.useCase";
import ToolRepositorySql from "../infra/repositories/sql/toolSQL.repository";

export default class UpdateToolController {
    static async exec(params: any, body: any) {
        const { id } = params
        const repository = new ToolRepositorySql()
        const updateTool = new UpdateTool(repository)
        const toolUpdated = await updateTool.exec(id, body)

        return { statusCode: 200, obj: toolUpdated }
    }
}