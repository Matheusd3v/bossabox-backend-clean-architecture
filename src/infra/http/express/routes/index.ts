import { Express } from "express";

import { toolRoutes } from "./tool";

const routes = (app: Express) => {
    toolRoutes(app);
};

export { routes };
