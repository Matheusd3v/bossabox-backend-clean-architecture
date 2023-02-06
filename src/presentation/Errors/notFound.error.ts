
import httpStatus from 'http-status';
import { ErrorGenerator } from './errorGenerator';

export class NotFoundError extends ErrorGenerator {
    constructor(description: string) {
        super(httpStatus.NOT_FOUND, description);
    }
}