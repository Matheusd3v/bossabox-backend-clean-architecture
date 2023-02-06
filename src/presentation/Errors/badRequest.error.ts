import httpStatus from 'http-status';
import { ErrorGenerator } from './errorGenerator';

export class BadRequestError extends ErrorGenerator {
    constructor(description: string) {
        super(httpStatus.BAD_REQUEST, description);
    }
}