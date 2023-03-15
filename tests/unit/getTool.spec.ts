import ToolFactory from "../../src/core/factories/toolFactory";
import GetTool from "../../src/core/useCase/getTool.useCase";
import AppDataSource from "../../src/infra/database/data-source";
import ToolRepositorySqlite from "../../src/infra/repositories/sql/toolSQLite.repository";
import { NotFoundError } from "../../src/presentation/Errors/notFound.error";

describe("Unit tests to get tool use case", () => {
    beforeAll(async () => await AppDataSource.initialize());

    afterAll(async () => {
        await AppDataSource.dropDatabase();
        await AppDataSource.destroy();
    });

    it("Should be able to get a existent tool from DB an return it", async () => {
        const toolRepository = new ToolRepositorySqlite();
        const getTool = new GetTool(toolRepository);

        const { id, title, description, tags, link } = await ToolFactory(
            toolRepository
        );

        const toolFromDB = await getTool.exec(id as number);

        expect(toolFromDB).toBeTruthy();
        expect(toolFromDB.id).toStrictEqual(id);
        expect(toolFromDB.title).toStrictEqual(title);
        expect(toolFromDB.description).toStrictEqual(description);
        expect(toolFromDB.tags).toStrictEqual(tags);
        expect(toolFromDB.link).toStrictEqual(link);
    });

    it("Should throw an error when tool id not exists", async () => {
        const toolRepository = new ToolRepositorySqlite();
        const getTool = new GetTool(toolRepository);
        const response = getTool.exec(999);

        await expect(response).rejects.toThrow(NotFoundError);
    });
});
