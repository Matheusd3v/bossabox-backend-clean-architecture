import { Router, Express } from "express";

import ExpressAdapter from "../../../../../adapter/expressAdapter";
import DeleteToolController from "../../../../../controller/deleteTool.controller";
import RetrieveAllToolsController from "../../../../../controller/retrieveAllTools.controller";
import RetrieveToolController from "../../../../../controller/retrieveTool.controller";
import SaveToolController from "../../../../../controller/saveTool.controller";

const toolRoutes = (app: Express) => {
    const route = Router();

    route.post("/tools", ExpressAdapter.create(SaveToolController.exec));

    route.get("/tools/:id", ExpressAdapter.create(RetrieveToolController.exec));

    route.get("/tools", ExpressAdapter.create(RetrieveAllToolsController.exec));

    route.delete(
        "/tools/:id",
        ExpressAdapter.create(DeleteToolController.exec)
    );

    app.use(route);
};

export { toolRoutes };
