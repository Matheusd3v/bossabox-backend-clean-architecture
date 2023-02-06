
import httpStatus from 'http-status';
import { ErrorGenerator } from './errorGenerator';

export class ConflictError extends ErrorGenerator {
    constructor(description: string) {
        super(httpStatus.CONFLICT, description);
    }
}