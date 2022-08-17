import { Router, Express } from "express";

import ExpressAdapter from "../../../../../adapter/expressAdapter";
import SaveToolController from "../../../../../controller/saveTool.controller";

const toolRoutes = (app: Express) => {
    const route = Router();

    route.post("/tool", ExpressAdapter.create(SaveToolController.exec));

    app.use("/api/v1", route);
};

export { toolRoutes };
