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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostById = exports.getAllPosts = exports.createPost = void 0;
const zod_1 = require("zod");
const db_1 = require("../config/db");
const createPostSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    url: zod_1.z.string()
});
const deletePostSchema = zod_1.z.object({
    id: zod_1.z.number(),
});
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = createPostSchema.parse(req.body);
        const user = req.user;
        const post = yield db_1.prismaClient.post.create({
            data: {
                Title: validatedData.title,
                Url: validatedData.url,
                authorId: user === null || user === void 0 ? void 0 : user.id
            }
        });
        return res.status(201).json({ message: 'Post created successfully', post });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.createPost = createPost;
const getAllPosts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield db_1.prismaClient.post.findMany();
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getAllPosts = getAllPosts;
const deletePostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = deletePostSchema.parse({ id: parseInt(req.params.id) });
        yield db_1.prismaClient.post.delete({
            where: { id: validatedData.id }
        });
        res.status(200).json("deleted the post");
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.deletePostById = deletePostById;
