import { ValidationRepository } from "@core/repositories/validation.repository";
import { Schema } from "yup"


export class YupValidator implements ValidationRepository {
    constructor(private readonly schema: Schema,) {}

    public async validate<T>(dto: T): Promise<boolean> {
        try {
            await this.schema.validate(dto, {
                abortEarly: false,
                stripUnknown: true,
                strict: true
            })

            return true
        } catch (error) {
            return false
        }
    }
}