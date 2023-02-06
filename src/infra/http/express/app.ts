import express, { Request, Response, NextFunction } from "express";
import { ErrorGenerator } from "../../../presentation/Errors/errorGenerator";
import { ErrorHandler } from "../../../presentation/Errors/errorHandler";

import { routes } from "./routes";

const app = express();

app.use(express.json());


routes(app);

app.use((err: ErrorGenerator, _req: Request, res: Response, _next: NextFunction) => {
    new ErrorHandler().catch(err, res)
});

export default app;
