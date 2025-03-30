
import { prismaClient } from '../config/db'

export default async () => {
  await prismaClient.$transaction([
    prismaClient.post.deleteMany(),
    prismaClient.user.deleteMany(),
  ])
}