import { Router, Express } from "express";

const toolRoutes = (app: Express) => {
    const route = Router();

    app.use("/api/v1", route);
};

export { toolRoutes };
