import ToolFactory from "../../src/core/factories/toolFactory";
import DeleteTool from "../../src/core/useCase/deleteTool.useCase";
import GetAllTools from "../../src/core/useCase/getAllTools.useCase";
import GetTool from "../../src/core/useCase/getTool.useCase";
import ToolRepositoryMemory from "../../src/infra/repositories/in-memory/tool.repository";

describe("Unit tests to deleteTool useCase", () => {
    it("Should be able to delete a tool from DB", async () => {
        const memoryRepo = new ToolRepositoryMemory();
        const getTool = new GetTool(memoryRepo);
        const getAllTools = new GetAllTools(memoryRepo);
        const deleteTool = new DeleteTool(memoryRepo);

        const { id, title } = await ToolFactory(memoryRepo);

        const tool = await getTool.exec(id as number);

        expect(tool.id).toEqual(id);
        expect(tool.title).toStrictEqual(title);

        await deleteTool.exec(id as number);

        const dbAfterDelete = await getAllTools.exec();

        expect(dbAfterDelete.length).toBe(0);
    });

    it("Should throw an error when tool id not exists", async () => {
        const memoryRepo = new ToolRepositoryMemory();
        const deleteTool = new DeleteTool(memoryRepo);

        let message = "";

        try {
            await deleteTool.exec(36);
        } catch (error) {
            if (error instanceof Error) message = error.message;
        }

        expect(message).toStrictEqual("Tool not found");
    });
});
