docker-compose up -d
npm run build
npm run generate
npx prisma migrate dev --name init
npm run test
docker-compose down