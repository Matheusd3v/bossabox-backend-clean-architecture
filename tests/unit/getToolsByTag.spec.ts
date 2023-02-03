import { faker } from "@faker-js/faker";

import ToolRepository from "../../src/core/repositories/tool.repository";
import GetToolsByTag from "../../src/core/useCase/getToolsByTag.useCase";
import SaveTool from "../../src/core/useCase/saveTool.useCase";
import AppDataSource from "../../src/infra/database/data-source";
import ToolRepositoryMemory from "../../src/infra/repositories/in-memory/tool.repository";
import ToolRepositorySqlite from "../../src/infra/repositories/sqlite/toolSQL.repository";

describe("Unit tests to useCase GetToolsByTag", () => {
    beforeAll(async () => await AppDataSource.initialize());

    afterAll(async () => {
        await AppDataSource.dropDatabase()
        await AppDataSource.destroy()
    });

    const createManyTools = async (toolRepository: ToolRepository, quantity: number, tag?: string) => {
        const saveTool = new SaveTool(toolRepository);
        const data = {
            title: faker.word.conjunction(),
            description: faker.random.words(5),
            tags: [`${faker.word.noun()}`, tag || "test"],
            link: faker.internet.url(),
        };

        for (let index = 0; index < quantity; index++) {
            await saveTool.exec(data);
        }
    };

    it("Should be able to filter tools by tag and return the list", async () => {
        const toolRepository = new ToolRepositorySqlite();
        await createManyTools(toolRepository, 4, "nodejs");
        const filterByTag = new GetToolsByTag(toolRepository);
       
        const toolsFiltered = await filterByTag.exec("nodejs");
       

        expect(toolsFiltered.length).toEqual(4);
        expect(toolsFiltered[0].tags).toContain("nodejs");
        expect(toolsFiltered[1].tags).toContain("nodejs");
        expect(toolsFiltered[2].tags).toContain("nodejs");
        expect(toolsFiltered[3].tags).toContain("nodejs");
    });

    it("Should throw an error when tool id not exists", async () => {
        const toolRepository = new ToolRepositorySqlite();
        await createManyTools(toolRepository, 5, "nodejs");
        const getTools = new GetToolsByTag(toolRepository);

        let message = "";

        try {
            await getTools.exec("react");
        } catch (error) {
            if (error instanceof Error) message = error.message;
        }

        expect(message).toStrictEqual("Not found tools with this tag");
    });
});
