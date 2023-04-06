import { Router, Express } from "express";

import ExpressAdapter from "@adapter/expressAdapter";
import DeleteToolController from "@controller/tool/deleteTool.controller";
import RetrieveAllToolsController from "@controller/tool/retrieveAllTools.controller";
import RetrieveToolController from "@controller/tool/retrieveTool.controller";
import SaveToolController from "@controller/tool/saveTool.controller";
import UpdateToolController from "@controller/tool/updateTool.controller";
import { validateRouteParam } from "../../middlewares/route-param-validator.middleware";

const toolRoutes = (app: Express) => {
    const route = Router();

    route.post("/tools", ExpressAdapter.create(SaveToolController.exec));

    route.get(
        "/tools/:id",
        validateRouteParam,
        ExpressAdapter.create(RetrieveToolController.exec)
    );

    route.get("/tools", ExpressAdapter.create(RetrieveAllToolsController.exec));

    route.delete(
        "/tools/:id",
        validateRouteParam,
        ExpressAdapter.create(DeleteToolController.exec)
    );

    route.patch(
        "/tools/:id",
        validateRouteParam,
        ExpressAdapter.create(UpdateToolController.exec)
    );

    app.use(route);
};

export { toolRoutes };
