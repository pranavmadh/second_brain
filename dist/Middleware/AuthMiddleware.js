"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const JWT_PASSWORD = process.env.JWT_PASSWORD;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!JWT_PASSWORD) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
        return;
    }
    const verification = jsonwebtoken_1.default.verify(token, JWT_PASSWORD);
    //@ts-ignore
    if (verification) {
        //@ts-ignore
        req.userId = verification.id;
        next();
    }
    else {
        res.status(403).json({
            success: false,
            message: "You are not logged in"
        });
    }
};
exports.AuthMiddleware = AuthMiddleware;
