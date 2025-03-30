import express from 'express';
import { createPost, deletePostById, getAllPosts } from '../controllers/post-controller';
import { authenticate } from "../config/authenticate";
const router = express.Router();

// Route to create a new post
router.post('/', authenticate,createPost);

// Route to get all posts
router.get('/', getAllPosts);

// Route to delete a post by ID
router.delete('/:id', authenticate,deletePostById);

export default router;