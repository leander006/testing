import { beforeAll, describe, expect, it } from "vitest";
import { app } from "..";
import request from 'supertest'
import { addDummyData } from "../helper/addDummyData";
import resetDb from "../helper/reset-db";


describe('Server test cases', () => {

    beforeAll(async () => {
        await resetDb();
       await addDummyData();
    });
    describe('User test cases', () => { 

        describe('Register test cases', () => { 

            it('should register user successfully', async() => {
                const response = await request(app).post('/api/user').send({ username: 'testuser', password: 'testpassword' });
                expect(response.status).toBe(201);
                expect(response.body.message).toBe('User registered successfully');
            });
        
            it('should return 400 for invalid data', async() => { 
                const response = await request(app).post('/api/user').send({ username: 'test', password: 'test' });
                expect(response.status).toBe(500);  
            });  
        
            it('should return 401 for existing user', async() => {
                const response = await request(app).post('/api/user').send({ username: 'testuser', password: 'testpassword' });
                expect(response.status).toBe(401);
                expect(response.body.error).toBe('Username already taken');
            });
        })
        describe('Login test cases', () => {
                it('should login user successfully', async() => {
                    const response = await request(app).get('/api/user').send({ username: 'testuser', password: 'testpassword' });
                    expect(response.status).toBe(200);
                    expect(response.body.message).toBe('Login successful');
                    expect(response.body.token).toBeDefined();
                });
        
                it('should return 401 for invalid username', async() => {
                    const response = await request(app).get('/api/user').send({ username: 'invaliduser', password: 'testpassword' });
                    expect(response.status).toBe(401);
                    expect(response.body.error).toBe('Invalid username or password');
                });
        
                it('should return 402 for invalid password', async() => {
                    const response = await request(app).get('/api/user').send({ username: 'testuser', password: 'invalidpassword' });
                    expect(response.status).toBe(402);
                    expect(response.body.error).toBe('Invalid username or password');
                });
                it('should return 500 for invalid data', async() => {
                    const response = await request(app).get('/api/user').send({ username: 'test', password: 'test' });
                    expect(response.status).toBe(500);
                });
        });
    })


    describe('Post test cases', () => { 
        describe('Post creation test cases ', () => { 

            it('should create post successfully with valid token', async () => {
                const loginResponse = await request(app).get('/api/user').send({ username: 'testuser', password: 'testpassword' });
                const token = loginResponse.body.token;

                const response = await request(app)
                    .post('/api/post')
                    .set('Authorization', `Bearer ${token}`)
                    .send({ title: 'test post', url: 'test url' });

                expect(response.status).toBe(201);
                expect(response.body.message).toBe('Post created successfully');
            });
        
            it('should return 500 for invalid data', async() => { 
                const loginResponse = await request(app).get('/api/user').send({ username: 'testuser', password: 'testpassword' });
                const token = loginResponse.body.token;
                const response = await request(app)
                    .post('/api/post')
                    .set('Authorization', `Bearer ${token}`)
                    .send({ title: '', url: 'test url' });

                expect(response.status).toBe(500);  
            });
         })

         describe('All post retrieval test cases',() =>{
            it('should get all posts', async() => {
                const response = await request(app).get('/api/post');
                expect(response.status).toBe(200);
                expect(response.body).toBeDefined();
                expect(response.body.length).toBe(4);
            })
         })

         describe('Post deletion test cases', () => {

            it('should delete post successfully', async() => {
                const loginResponse = await request(app).get('/api/user').send({ username: 'testuser', password: 'testpassword' });
                const token = loginResponse.body.token;

                const response = await request(app)
                    .delete('/api/post/3')
                    .set('Authorization', `Bearer ${token}`);

                expect(response.status).toBe(200);
                expect(response.body).toBe('deleted the post');
            });

            it('should return 500 for invalid data', async() => {   
                const loginResponse = await request(app).get('/api/user').send({ username: 'testuser', password: 'testpassword' });
                const token = loginResponse.body.token;
                const response = await request(app)
                    .delete('/api/post/invalid')
                    .set('Authorization', `Bearer ${token}`);
                expect(response.status).toBe(500);
            })
             it('should return 404 for invalid token', async() => {
                const response = await request(app)
                    .delete('/api/post/1')
                expect(response.status).toBe(404);
             });
         })

         
    })
})