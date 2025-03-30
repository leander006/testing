import { Request, Response } from 'express';

import { z } from 'zod';
import { prismaClient } from '../config/db';


const createPostSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    url: z.string()
});

const deletePostSchema = z.object({
    id: z.number(),
});


export const createPost = async (req: Request, res: Response) : Promise<any> => {
    try {
        const validatedData = createPostSchema.parse(req.body);
        const user = req.user as { id: number } ;
        const post = await prismaClient.post.create({
            data: {
                Title: validatedData.title,
                Url: validatedData.url,
                authorId: user?.id
            }
        })        
        return res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
        console.log(error);
       return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const getAllPosts = async (_req: Request, res: Response) => {
    try {
        const posts = await prismaClient.post.findMany();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deletePostById = async (req: Request, res: Response) : Promise<any> => {
    try {
        const validatedData  = deletePostSchema.parse({ id: parseInt(req.params.id) });

        await prismaClient.post.delete({
            where: { id:validatedData.id } });
        res.status(200).json("deleted the post");
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};