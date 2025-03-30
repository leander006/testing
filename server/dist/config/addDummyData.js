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
exports.addDummyData = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function addDummyData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Adding dummy users
            const users = yield prisma.user.createMany({
                data: [
                    { username: 'John Doe', password: 'john' },
                    { username: 'Jane Smith', password: 'jane' },
                    { username: 'Alice Johnson', password: 'alice' },
                ],
            });
            console.log(`${users.count} users added.`);
            const user = yield prisma.user.findMany();
            // Adding dummy posts
            const posts = yield prisma.post.createMany({
                data: [
                    { Title: 'First Post', Url: 'This is the first post', authorId: user[0].id },
                    { Title: 'Second Post', Url: 'This is the second post', authorId: user[1].id },
                    { Title: 'Third Post', Url: 'This is the third post', authorId: user[2].id },
                ],
            });
            console.log(`${posts.count} posts added.`);
        }
        catch (error) {
            console.error('Error adding dummy data:', error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
exports.addDummyData = addDummyData;
