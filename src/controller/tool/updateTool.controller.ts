import Tool from "@core/entities/tools";
import UpdateTool from "@core/useCase/updateTool.useCase";
import ToolRepositorySql from "@infra/repositories/sql/toolSQL.repository";
import { YupValidator } from "@infra/repositories/validator/yup";
import { toolUpdateSchema } from "@infra/repositories/validator/yup/schemas";
import { BadRequestError } from "@presentation/Errors";

export default class UpdateToolController {
    static async exec(params: any, body: any) {
        const { id } = params
        const repository = new ToolRepositorySql()
        const updateTool = new UpdateTool(repository)
        const validator = new YupValidator(toolUpdateSchema)
        const validBody = await validator.validate<Partial<Tool>>(body)

        if (!validBody) {
            throw new BadRequestError('Invalid body has been send. Please, verify documentation.');            
        }

        const toolUpdated = await updateTool.exec(id, body)

        return { statusCode: 200, obj: toolUpdated }
    }
}