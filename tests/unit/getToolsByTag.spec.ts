import { faker } from "@faker-js/faker";

import Tool from "../../src/core/entities/tools";
import GetToolsByTag from "../../src/core/useCase/getToolsByTag.useCase";
import SaveTool from "../../src/core/useCase/saveTool.useCase";
import ToolRepositoryMemory from "../../src/infra/repositories/in-memory/tool.repository";

describe("Unit tests to useCase GetToolsByTag", () => {
    const memoryRepo = new ToolRepositoryMemory();

    const createManyTools = async (quantity: number, tag?: string) => {
        const tools: Tool[] = [];
        const saveTool = new SaveTool(memoryRepo);
        const data = {
            title: faker.word.conjunction(),
            description: faker.random.words(5),
            tags: [`${faker.word.noun()}`, tag || "test"],
            link: faker.internet.url(),
        };

        for (let index = 0; index < quantity; index++) {
            const newTool = await saveTool.exec(data);
            tools.push(newTool);
        }

        return tools;
    };

    it("Should be able to filter tools by tag and return the list", async () => {
        await createManyTools(4, "nodejs");
        const filterByTag = new GetToolsByTag(memoryRepo);

        const toolsFiltered = await filterByTag.exec("nodejs");

        expect(toolsFiltered.length).toEqual(4);
        expect(toolsFiltered[0].tags).toContain("nodejs");
        expect(toolsFiltered[1].tags).toContain("nodejs");
        expect(toolsFiltered[2].tags).toContain("nodejs");
        expect(toolsFiltered[3].tags).toContain("nodejs");
    });

    it("Should throw an error when tool id not exists", async () => {
        await createManyTools(5, "nodejs");
        const getTools = new GetToolsByTag(memoryRepo);

        let message = "";

        try {
            await getTools.exec("react");
        } catch (error) {
            if (error instanceof Error) message = error.message;
        }

        expect(message).toStrictEqual("Not found tools with this tag");
    });
});
