import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '../.env' });

// Create a gateway instance with subgraph services
const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: 'user', url: 'http://localhost:3001/graphql' },
      { name: 'insurance', url: 'http://localhost:3002/graphql' },
      { name: 'notification', url: 'http://localhost:3003/graphql' },
    ],
  }),
});

// Initialize the Apollo Server
const server = new ApolloServer({
  gateway,
});

// Start the server
async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀 Gateway ready at ${url}`);
}

startServer().catch((err) => {
  console.error('Error starting gateway server:', err);
});