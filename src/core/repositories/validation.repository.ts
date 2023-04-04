export interface ValidationRepository {
    validate<T>(body: T): Promise<boolean>
} 