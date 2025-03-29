"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("../controllers/post-controller");
const authenticate_1 = require("../config/authenticate");
const router = express_1.default.Router();
// Route to create a new post
router.post('/', authenticate_1.authenticate, post_controller_1.createPost);
// Route to get all posts
router.get('/', post_controller_1.getAllPosts);
// Route to delete a post by ID
router.delete('/:id', post_controller_1.deletePostById);
exports.default = router;
