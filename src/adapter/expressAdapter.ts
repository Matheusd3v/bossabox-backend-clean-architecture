import { Request, Response } from "express";

export default class ExpressAdapter {
    static create(fn: any) {
        return async (req: Request, res: Response) => {
            const obj = await fn(req.params, req.body, req.query);

            return res.json(obj);
        };
    }
}
