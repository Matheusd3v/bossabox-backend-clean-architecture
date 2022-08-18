import ToolFactory from "../../src/core/factories/toolFactory";
import GetAllTools from "../../src/core/useCase/getAllTools.useCase";
import AppDataSource from "../../src/infra/database/data-source";
import ToolRepositorySqlite from "../../src/infra/repositories/sqlite/toolSQL.repository";

describe("Unit tests to save tool use case", () => {
    beforeAll(async () => await AppDataSource.initialize());

    afterAll(async () => await AppDataSource.destroy());

    it("Should be able to save a new tool, and return tool from DB", async () => {
        const memoryRepo = new ToolRepositorySqlite();
        const getAllTools = new GetAllTools(memoryRepo);

        const tool = await ToolFactory(memoryRepo);

        const allTools = await getAllTools.exec();

        expect(allTools).toContainEqual(tool);
        expect(allTools[0].id).toBeTruthy();
        expect(allTools[0].title).toBeTruthy();
        expect(allTools[0].description).toBeTruthy();
        expect(allTools[0].tags).toBeTruthy();
        expect(allTools[0].link).toBeTruthy();
    });
});
