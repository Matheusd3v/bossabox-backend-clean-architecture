import { faker } from "@faker-js/faker";

import Tool from "../entities/tools";
import ToolRepository from "../repositories/tool.repository";
import SaveTool from "../useCase/saveTool.useCase";

const ToolFactory = async (repository: ToolRepository): Promise<Tool> => {
    const saveTool = new SaveTool(repository);

    const data = {
        title: faker.word.conjunction(),
        description: faker.random.words(5),
        tags: [`${faker.word.noun()}`],
        link: faker.internet.url(),
    };

    const tool = await saveTool.exec(data);

    return tool;
};

export default ToolFactory;
