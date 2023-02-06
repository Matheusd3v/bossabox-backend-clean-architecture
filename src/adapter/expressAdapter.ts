import { Request, Response } from "express";
import { ErrorHandler } from "../presentation/Errors/errorHandler";

export default class ExpressAdapter {
    static create(fn: any) {
        return async (req: Request, res: Response) => {
            try {
                const { statusCode, obj } = await fn(req.params, req.body, req.query);
    
                return res.status(statusCode).json(obj);                
            } catch (error) {
                return new ErrorHandler().catch(error, res)
            }
        };
    }
}
