import Tool from "@core/entities/tools";
import SaveTool from "@core/useCase/saveTool.useCase";
import ToolRepositorySql from "@infra/repositories/sql/toolSQL.repository";
import { YupValidator } from "@infra/repositories/validator/yup";
import { toolSchema } from "@infra/repositories/validator/yup/schemas";
import { BadRequestError } from "@presentation/Errors";

export default class SaveToolController {
    static async exec(_: any, body: any) {
        const repository = new ToolRepositorySql();
        const saveTool = new SaveTool(repository);
        const validator = new YupValidator(toolSchema)
        const isValidBody = await validator.validate<Tool>(body)

        if (!isValidBody) {
            throw new BadRequestError(`Invalid body has been send. Please, verify documentation.`);
        }

        const toolSaved = await saveTool.exec(body);

        return { statusCode: 201, obj: toolSaved };
    }
}
