import { Router, Express } from "express";
import swaggerUi from "swagger-ui-express"
import swaggerJson from "../../../../docs/swagger.json"

const docRouter = (app: Express) => {
    app.use(
        '/docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerJson)
    )
};

export { docRouter };
