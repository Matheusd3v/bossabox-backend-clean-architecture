import { faker } from "@faker-js/faker";
import ToolFactory from "../../src/core/factories/toolFactory";
import GetAllTools from "../../src/core/useCase/getAllTools.useCase";
import SaveTool from "../../src/core/useCase/saveTool.useCase";
import ToolRepositoryMemory from "../../src/infra/repositories/in-memory/tool.repository";
import { ConflictError } from "../../src/presentation/Errors";

describe("Unit tests to save tool use case", () => {
    it("Should be able to save a new tool, and return tool from DB", async () => {
        const toolRepository = new ToolRepositoryMemory();
        const getAllTools = new GetAllTools(toolRepository);

        const tool = await ToolFactory(toolRepository);

        const allTools = await getAllTools.exec();

        expect(allTools).toContainEqual(tool);
        expect(allTools[0].id).toBeTruthy();
        expect(allTools[0].title).toBeTruthy();
        expect(allTools[0].description).toBeTruthy();
        expect(allTools[0].tags).toBeTruthy();
        expect(allTools[0].link).toBeTruthy();
    });

    it("Should be able to throws ConflictError, when user try save a existent title", async () => {
        const toolRepository = new ToolRepositoryMemory();
        const saveTool = new SaveTool(toolRepository)

        const tool = await ToolFactory(toolRepository)

        const newTool = saveTool.exec({
            title: tool.title,
            description: faker.random.words(5),
            tags: [`${faker.word.noun()}`],
            link: faker.internet.url(),
        })

        await expect(newTool).rejects.toThrow(ConflictError)
    })
});
