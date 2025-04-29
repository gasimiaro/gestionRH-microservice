import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSubgraphSchema } from '@apollo/subgraph';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import sequelize from './config/database';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '../.env' });

// Initialize Apollo Server
const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

// Initialize Express
const app = express();
const httpServer = http.createServer(app);

// Start the server
async function startServer() {
  // Start Apollo Server
  await server.start();

  // Apply middleware
  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    expressMiddleware(server),
  );

  // Sync database
  try {
    await sequelize.sync();
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing database:', error);
    process.exit(1);
  }

  // Start the server
  const PORT = 3001;
  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`User Service ready at http://localhost:${PORT}/graphql`);
}

startServer().catch((err) => {
  console.error('Error starting server:', err);
});