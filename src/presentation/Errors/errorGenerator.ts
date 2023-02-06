export class ErrorGenerator {
    public status: number;

    public description: string;

    constructor(status: number, description: string) {
        this.status = status;
        this.description = description;
    }
}

