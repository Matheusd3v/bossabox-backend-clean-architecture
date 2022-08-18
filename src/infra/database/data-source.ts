import dotenv from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import "reflect-metadata";

dotenv.config();

const databaseConfig: { [key: string]: DataSourceOptions } = {
    development: {
        type: "sqlite",
        database: "./src/infra/database/localDB.db",
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

const env = process.env.NODE_ENV || "development";

const AppDataSource = new DataSource(databaseConfig[env]);

export default AppDataSource;
