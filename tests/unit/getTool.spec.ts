import ToolFactory from "../../src/core/factories/toolFactory";
import GetTool from "../../src/core/useCase/getTool.useCase";
import ToolRepositoryMemory from "../../src/infra/repositories/in-memory/tool.repository";

describe("Unit tests to get tool use case", () => {
    it("Should be able to get a existent tool from DB an return it", async () => {
        const memoryRepo = new ToolRepositoryMemory();
        const getTool = new GetTool(memoryRepo);

        const { id, title, description, tags, link } = await ToolFactory(
            memoryRepo
        );

        const toolFromDB = await getTool.exec(id as number);

        expect(toolFromDB).toBeTruthy();
        expect(toolFromDB.id).toStrictEqual(id);
        expect(toolFromDB.title).toStrictEqual(title);
        expect(toolFromDB.description).toStrictEqual(description);
        expect(toolFromDB.tags).toStrictEqual(tags);
        expect(toolFromDB.link).toStrictEqual(link);
    });
});
