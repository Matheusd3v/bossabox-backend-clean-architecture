import { ErrorGenerator } from "./errorGenerator";
import { Response } from "express";

export class ErrorHandler {
    /**
     * catch
     */
    public catch(err: unknown, res: Response) {
        if (err instanceof ErrorGenerator) {
            const { status, description } = err;

            return res.status(status).json({ error: description });
        }

        console.error(err)
        return res.status(500).json({ error: "Unexpected Error." });
    }
}
