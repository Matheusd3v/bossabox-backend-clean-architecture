import ToolFactory from "../../src/core/factories/toolFactory";
import DeleteTool from "../../src/core/useCase/deleteTool.useCase";
import GetAllTools from "../../src/core/useCase/getAllTools.useCase";
import GetTool from "../../src/core/useCase/getTool.useCase";
import AppDataSource from "../../src/infra/database/data-source";
import ToolRepositoryMemory from "../../src/infra/repositories/in-memory/tool.repository";
import ToolRepositorySqlite from "../../src/infra/repositories/sql/toolSQLite.repository";
import { NotFoundError } from "../../src/presentation/Errors/notFound.error";

describe("Unit tests to deleteTool useCase", () => {
    beforeAll(async () => await AppDataSource.initialize());

    afterAll(async () => {
        await AppDataSource.dropDatabase();
        await AppDataSource.destroy();
    });

    it("Should be able to delete a tool from DB", async () => {
        const toolRepository = new ToolRepositorySqlite();
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
        const toolRepository = new ToolRepositorySqlite();
        const deleteTool = new DeleteTool(toolRepository);
        const response = deleteTool.exec(36);

        await expect(response).rejects.toThrowError(NotFoundError);
    });
});
