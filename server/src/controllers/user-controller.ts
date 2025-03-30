import { Request, Response } from 'express';
import { z } from 'zod';
import { JWT_SECRET } from '../config/server-config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { prismaClient } from '../config/db';

const userSchema = z.object({
    username: z.string().min(5, 'Username must be at least 5 characters long'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const register = async (req: Request, res: Response): Promise<any> => {
    try {        
        const validatedData = userSchema.parse(req.body);
 
        // Check if user already exists
        const existingUser = await prismaClient.user.findFirst({ where: { username: validatedData.username } });        
        if (existingUser) {
            return res.status(401).json({ error: 'Username already taken' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(validatedData.password, 10);
        
        // Create new user
        const newUser = await prismaClient.user.create({
            data: {
                username:validatedData.username,
                password: hashedPassword,
            },
        });
     
        return res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        return res.status(500).json({ error: error});
    }

};

export const login = async (req: Request, res: Response) : Promise<any> => {
    try {

        const validatedData= userSchema.parse(req.body);
        const user = await prismaClient.user.findFirst({ where: { username: validatedData.username } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const isPasswordValid = await bcrypt.compare(validatedData.password, user.password);
        if (!isPasswordValid) {
            return res.status(402).json({ error: 'Invalid username or password' });
        }
        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};