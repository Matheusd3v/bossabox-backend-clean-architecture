export class ErrorGenerator extends Error {
    public status: number;

    public description: string;

    constructor(status: number, description: string) {
        super()
        this.status = status;
        this.description = description;
    }
}

