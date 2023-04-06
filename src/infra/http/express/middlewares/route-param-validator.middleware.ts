import { NextFunction, Request, Response } from "express";
import { BadRequestError, ErrorHandler } from "@presentation/Errors";
import { YupValidator } from "@infra/repositories/validator/yup";
import { idSchema } from "@infra/repositories/validator/yup/schemas";

export const validateRouteParam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const validator = new YupValidator(idSchema);
        const validId = await validator.validate<number>(Number(id))

        if (!validId) {
            throw new BadRequestError("Invalid Route Param");
        }

        return next();
    } catch (error) {
        return new ErrorHandler().catch(error, res);
    }
};