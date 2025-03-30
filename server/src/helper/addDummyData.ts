import { prismaClient } from '../config/db';

export async function addDummyData() {
    try {
        // Adding dummy users
        const users = await prismaClient.user.createMany({
            data: [
                { username: 'John Doe', password: 'john' },
                { username: 'Jane Smith', password: 'jane' },
                { username: 'Alice Johnson', password: 'alice' },
            ],
        });

        console.log(`${users.count} users added.`);
        const user = await prismaClient.user.findMany();
      
        // Adding dummy posts
        const posts = await prismaClient.post.createMany({
            data: [
                { Title: 'First Post', Url: 'This is the first post', authorId: user[0].id },
                { Title: 'Second Post', Url: 'This is the second post', authorId: user[1].id },
                { Title: 'Third Post', Url: 'This is the third post', authorId: user[2].id },
            ],
        });

        console.log(`${posts.count} posts added.`);
    } catch (error) {
        console.error('Error adding dummy data:', error);
    } finally {
        await prismaClient.$disconnect();
    }
}
