import ToolFactory from "../../src/core/factories/toolFactory";
import DeleteTool from "../../src/core/useCase/deleteTool.useCase";
import GetAllTools from "../../src/core/useCase/getAllTools.useCase";
import GetTool from "../../src/core/useCase/getTool.useCase";
import ToolRepositoryMemory from "../../src/infra/repositories/in-memory/tool.repository";
import { NotFoundError } from "../../src/presentation/Errors/notFound.error";

describe("Unit tests to deleteTool useCase", () => {
    it("Should be able to delete a tool from DB", async () => {
        const toolRepository = new ToolRepositoryMemory();
        const getTool = new GetTool(toolRepository);
        const getAllTools = new GetAllTools(toolRepository);
        const deleteTool = new DeleteTool(toolRepository);
        const { id, title } = await ToolFactory(toolRepository);
        const tool = await getTool.exec(id as number);

        expect(tool.id).toEqual(id);
        expect(tool.title).toStrictEqual(title);

        await deleteTool.exec(id as number);

        const dbAfterDelete = await getAllTools.exec();

        expect(dbAfterDelete.length).toBe(0);
    });

    it("Should throw an error when tool id not exists", async () => {
        const toolRepository = new ToolRepositoryMemory();
        const deleteTool = new DeleteTool(toolRepository);
        const response = deleteTool.exec(36);

        await expect(response).rejects.toThrowError(NotFoundError);
    });
});
