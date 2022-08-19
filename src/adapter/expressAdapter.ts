import { Request, Response } from "express";

export default class ExpressAdapter {
    static create(fn: any) {
        return async (req: Request, res: Response) => {
            const { statusCode, obj } = await fn(req.params, req.body, req.query);

            return res.status(statusCode).json(obj);
        };
    }
}
