import { Express } from "express";
// import { docRouter } from "./doc";

import { toolRoutes } from "./tool";

const routes = (app: Express) => {
    toolRoutes(app);
    // docRouter(app)
};

export { routes };
