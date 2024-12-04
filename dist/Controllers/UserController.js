"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetContent = exports.Content = exports.UserLogin = exports.UserSignup = void 0;
const db_1 = require("../db");
const zod_1 = __importDefault(require("zod"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_PASSWORD = process.env.JWT_PASSWORD;
//USer Signup Controller
const UserSignupSchema = zod_1.default.object({
    username: zod_1.default.string().min(3, "Username is required"),
    email: zod_1.default.string().email("Invalid Email Address"),
    password: zod_1.default.string().min(6).refine((password) => /[A-Z]/.test(password), { message: "Password Should Contian Atleast one Capital Letter" }).refine((password) => /[a-z]/.test(password), { message: "Password should contain atleast one Small Letter" }).refine((password) => /[!@#$%^&*()_=]/.test(password), { message: "Should Contain a Special Character" })
});
const UserSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = UserSignupSchema.safeParse(req.body);
    if (!validation.success) {
        res.status(400).json({
            success: false,
            errors: validation.error.errors
        });
        return;
    }
    const { username, email, password } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 5);
    try {
        yield db_1.UserModel.create({
            email: email,
            username: username,
            password: hashedPassword
        });
    }
    catch (e) {
        res.status(411).json("User Already Exists");
    }
    res.status(200).json({
        success: true,
        message: "User Signup Successfull"
    });
});
exports.UserSignup = UserSignup;
const UserLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log(username, password);
    const UserValidation = yield db_1.UserModel.findOne({
        username
    });
    console.log(UserValidation);
    if (!JWT_PASSWORD) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
        return;
    }
    if (UserValidation) {
        const passwordValidate = yield bcrypt_1.default.compare(password, UserValidation.password);
        if (passwordValidate) {
            const token = jsonwebtoken_1.default.sign({
                id: UserValidation._id
            }, JWT_PASSWORD);
            res.status(200).json({
                success: true,
                message: "User Login Successful",
                token
            });
        }
    }
    else {
        res.status(403).json({
            success: false,
            message: "Login Credentials Wrong"
        });
    }
});
exports.UserLogin = UserLogin;
const Content = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const link = req.body.link;
    const tag = req.body.tag;
    console.log(title, link, tag);
    //@ts-ignore
    console.log(req.userId);
    try {
        yield db_1.ContentModel.create({
            title,
            link,
            tag: [],
            //@ts-ignore
            userId: req.userId
        });
        res.status(200).json({
            success: true,
            message: "Content Added Successfully"
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});
exports.Content = Content;
const GetContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    try {
        const content = yield db_1.ContentModel.find({
            userId: userId
        });
        res.status(200).json({
            success: true,
            contents: content
        });
    }
    catch (e) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});
exports.GetContent = GetContent;
