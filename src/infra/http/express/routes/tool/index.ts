import { Router, Express } from "express";

import ExpressAdapter from "../../../../../adapter/expressAdapter";
import RetrieveToolController from "../../../../../controller/retrieveTool.controller";
import SaveToolController from "../../../../../controller/saveTool.controller";

const toolRoutes = (app: Express) => {
    const route = Router();

    route.post("/tool", ExpressAdapter.create(SaveToolController.exec));

    route.get("/tool/:id", ExpressAdapter.create(RetrieveToolController.exec));

    app.use("/api/v1", route);
};

export { toolRoutes };
