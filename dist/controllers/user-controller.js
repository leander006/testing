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
exports.login = exports.register = void 0;
const zod_1 = require("zod");
const server_config_1 = require("../config/server-config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../config/db");
const userSchema = zod_1.z.object({
    username: zod_1.z.string().min(5, 'Username must be at least 5 characters long'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = userSchema.parse(req.body);
        // Check if user already exists
        const existingUser = yield db_1.prismaClient.user.findFirst({ where: { username: validatedData.username } });
        if (existingUser) {
            return res.status(401).json({ error: 'Username already taken' });
        }
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(validatedData.password, 10);
        // Create new user
        const newUser = yield db_1.prismaClient.user.create({
            data: {
                username: validatedData.username,
                password: hashedPassword,
            },
        });
        return res.status(201).json({ message: 'User registered successfully', user: newUser });
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = userSchema.parse(req.body);
        const user = yield db_1.prismaClient.user.findFirst({ where: { username: validatedData.username } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(validatedData.password, user.password);
        if (!isPasswordValid) {
            return res.status(402).json({ error: 'Invalid username or password' });
        }
        if (!server_config_1.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, server_config_1.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
});
exports.login = login;
