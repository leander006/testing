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
const __1 = require("..");
const supertest_1 = __importDefault(require("supertest"));
const addDummyData_1 = require("../helper/addDummyData");
const reset_db_1 = __importDefault(require("../helper/reset-db"));
(0, vitest_1.describe)('Server test cases', () => {
    (0, vitest_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, reset_db_1.default)();
        yield (0, addDummyData_1.addDummyData)();
    }));
    (0, vitest_1.describe)('User test cases', () => {
        (0, vitest_1.describe)('Register test cases', () => {
            (0, vitest_1.it)('should register user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(__1.app).post('/api/user').send({ username: 'testuser', password: 'testpassword' });
                (0, vitest_1.expect)(response.status).toBe(201);
                (0, vitest_1.expect)(response.body.message).toBe('User registered successfully');
            }));
            (0, vitest_1.it)('should return 400 for invalid data', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(__1.app).post('/api/user').send({ username: 'test', password: 'test' });
                (0, vitest_1.expect)(response.status).toBe(500);
            }));
            (0, vitest_1.it)('should return 401 for existing user', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(__1.app).post('/api/user').send({ username: 'testuser', password: 'testpassword' });
                (0, vitest_1.expect)(response.status).toBe(401);
                (0, vitest_1.expect)(response.body.error).toBe('Username already taken');
            }));
        });
        (0, vitest_1.describe)('Login test cases', () => {
            (0, vitest_1.it)('should login user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(__1.app).get('/api/user').send({ username: 'testuser', password: 'testpassword' });
                (0, vitest_1.expect)(response.status).toBe(200);
                (0, vitest_1.expect)(response.body.message).toBe('Login successful');
                (0, vitest_1.expect)(response.body.token).toBeDefined();
            }));
            (0, vitest_1.it)('should return 401 for invalid username', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(__1.app).get('/api/user').send({ username: 'invaliduser', password: 'testpassword' });
                (0, vitest_1.expect)(response.status).toBe(401);
                (0, vitest_1.expect)(response.body.error).toBe('Invalid username or password');
            }));
            (0, vitest_1.it)('should return 402 for invalid password', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(__1.app).get('/api/user').send({ username: 'testuser', password: 'invalidpassword' });
                (0, vitest_1.expect)(response.status).toBe(402);
                (0, vitest_1.expect)(response.body.error).toBe('Invalid username or password');
            }));
            (0, vitest_1.it)('should return 500 for invalid data', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(__1.app).get('/api/user').send({ username: 'test', password: 'test' });
                (0, vitest_1.expect)(response.status).toBe(500);
            }));
        });
    });
    (0, vitest_1.describe)('Post test cases', () => {
        (0, vitest_1.describe)('Post creation test cases ', () => {
            (0, vitest_1.it)('should create post successfully with valid token', () => __awaiter(void 0, void 0, void 0, function* () {
                const loginResponse = yield (0, supertest_1.default)(__1.app).get('/api/user').send({ username: 'testuser', password: 'testpassword' });
                const token = loginResponse.body.token;
                const response = yield (0, supertest_1.default)(__1.app)
                    .post('/api/post')
                    .set('Authorization', `Bearer ${token}`)
                    .send({ title: 'test post', url: 'test url' });
                (0, vitest_1.expect)(response.status).toBe(201);
                (0, vitest_1.expect)(response.body.message).toBe('Post created successfully');
            }));
            (0, vitest_1.it)('should return 500 for invalid data', () => __awaiter(void 0, void 0, void 0, function* () {
                const loginResponse = yield (0, supertest_1.default)(__1.app).get('/api/user').send({ username: 'testuser', password: 'testpassword' });
                const token = loginResponse.body.token;
                const response = yield (0, supertest_1.default)(__1.app)
                    .post('/api/post')
                    .set('Authorization', `Bearer ${token}`)
                    .send({ title: '', url: 'test url' });
                (0, vitest_1.expect)(response.status).toBe(500);
            }));
        });
        (0, vitest_1.describe)('All post retrieval test cases', () => {
            (0, vitest_1.it)('should get all posts', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(__1.app).get('/api/post');
                (0, vitest_1.expect)(response.status).toBe(200);
                (0, vitest_1.expect)(response.body).toBeDefined();
                (0, vitest_1.expect)(response.body.length).toBe(4);
            }));
        });
        (0, vitest_1.describe)('Post deletion test cases', () => {
            (0, vitest_1.it)('should delete post successfully', () => __awaiter(void 0, void 0, void 0, function* () {
                const loginResponse = yield (0, supertest_1.default)(__1.app).get('/api/user').send({ username: 'testuser', password: 'testpassword' });
                const token = loginResponse.body.token;
                const response = yield (0, supertest_1.default)(__1.app)
                    .delete('/api/post/3')
                    .set('Authorization', `Bearer ${token}`);
                (0, vitest_1.expect)(response.status).toBe(200);
                (0, vitest_1.expect)(response.body).toBe('deleted the post');
            }));
            (0, vitest_1.it)('should return 500 for invalid data', () => __awaiter(void 0, void 0, void 0, function* () {
                const loginResponse = yield (0, supertest_1.default)(__1.app).get('/api/user').send({ username: 'testuser', password: 'testpassword' });
                const token = loginResponse.body.token;
                const response = yield (0, supertest_1.default)(__1.app)
                    .delete('/api/post/invalid')
                    .set('Authorization', `Bearer ${token}`);
                (0, vitest_1.expect)(response.status).toBe(500);
            }));
            (0, vitest_1.it)('should return 404 for invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(__1.app)
                    .delete('/api/post/1');
                (0, vitest_1.expect)(response.status).toBe(404);
            }));
        });
    });
});
