import AppDataSource from "../../database/data-source";
import app from "./app";

const PORT = 3000;

(async () =>
    await AppDataSource.initialize()
        .then(() => console.log("DB connected"))
        .catch((e) => console.log("DB failed", e))
)();

app.listen(PORT, () => {
    console.log(`Running at:: ${3000}`);
});
