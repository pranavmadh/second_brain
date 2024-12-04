"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const UserRoutes_1 = __importDefault(require("./Routes/UserRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const MONGOOSE_URL = process.env.MONGOOSE_URL;
app.use(express_1.default.json());
app.use("/api/v1/user", UserRoutes_1.default);
const main = () => {
    if (!MONGOOSE_URL) {
        console.log("Database Conection Failed");
    }
    else {
        mongoose_1.default.connect(MONGOOSE_URL);
        console.log("Datbase Connected Successfully");
        app.listen(3000, () => {
            console.log("App listening to port 3000");
        });
    }
};
main();
