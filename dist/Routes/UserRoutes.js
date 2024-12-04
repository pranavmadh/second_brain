"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../Controllers/UserController");
const AuthMiddleware_1 = require("../Middleware/AuthMiddleware");
const UserRouter = express_1.default.Router();
UserRouter.post('/signup', UserController_1.UserSignup);
UserRouter.post('/login', UserController_1.UserLogin);
UserRouter.post('/content', AuthMiddleware_1.AuthMiddleware, UserController_1.Content);
UserRouter.get('/content', AuthMiddleware_1.AuthMiddleware, UserController_1.GetContent);
exports.default = UserRouter;
