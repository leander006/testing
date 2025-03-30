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
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const __1 = require("..");
const db_1 = require("../config/db");
vitest_1.vi.mock('../config/db');
(0, vitest_1.describe)('Testing user route', () => {
    (0, vitest_1.describe)('Register test cases', () => {
        (0, vitest_1.it)('should return 201 status code', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(__1.app).post('/api/user').send({
                username: 'Leander',
                password: 'Leander'
            });
            (0, vitest_1.expect)(response.status).toBe(201);
            (0, vitest_1.expect)(response.body).toEqual({ message: 'User registered successfully' });
        }));
        (0, vitest_1.it)('should return 500 status code for zod validation', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(__1.app).post('/api/user').send({
                username: 'Le',
                password: 'Le'
            });
            (0, vitest_1.expect)(response.status).toBe(500);
        }));
    });
    (0, vitest_1.describe)('Login test cases', () => {
        (0, vitest_1.it)('should return 200 and a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
            db_1.prismaClient.user.findMany.mockResolvedValue([
                { id: 1, username: 'user1', password: 'password1' },
                { id: 2, username: 'user2', password: 'password2' },
            ]);
            const response = yield (0, supertest_1.default)(__1.app).get('/users');
            (0, vitest_1.expect)(response.status).toBe(200);
            (0, vitest_1.expect)(response.body.users).toEqual([
                { id: 1, username: 'user1' },
                { id: 2, username: 'user2' },
            ]);
            (0, vitest_1.expect)(db_1.prismaClient.user.findMany).toHaveBeenCalledTimes(1);
        }));
        (0, vitest_1.it)('should return 201 status code', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(__1.app).get('/api/user').send({
                username: 'Leander',
                password: 'Leander'
            });
            (0, vitest_1.expect)(response.status).toBe(401);
            (0, vitest_1.expect)(response.body).toEqual({ error: 'Invalid username or password' });
        }));
        (0, vitest_1.it)('should return 500 status code for zod validation', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(__1.app).get('/api/user').send({
                username: 'Le',
                password: 'Le'
            });
            (0, vitest_1.expect)(response.status).toBe(500);
        }));
    });
});
