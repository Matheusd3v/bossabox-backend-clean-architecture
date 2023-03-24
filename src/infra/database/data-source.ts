import { config } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import "reflect-metadata";

config();

enum ENV_TYPE {
    development = 'development',
    production = 'production',
    test = 'test'
}

const databaseConfig: { [key: string]: DataSourceOptions } = {
    development: {
        type: "postgres",
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        port: +(process.env.DB_PORT ?? 5432),
        synchronize: true,
        logging: false,
        entities: ["src/infra/database/entities/**/*.*"],
    },

    test: {
        type: "sqlite",
        database: "./tests/DBtest.db",
        synchronize: true,
        logging: false,
        dropSchema: true,
        entities: ["src/infra/database/entities/**/*.*"],
    },
};

const env = process.env.NODE_ENV === ENV_TYPE.development? ENV_TYPE.development : ENV_TYPE.test ;

const AppDataSource = new DataSource(databaseConfig[env]);

export default AppDataSource;
