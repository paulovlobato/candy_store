require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { ApolloServer } = require('apollo-server-express');
const { apiKeyAuth } = require('./middleware');

const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const apiKey = req.get('X-API-Key');
    if (!apiKey || apiKey !== process.env.API_KEY) {
      console.error('Unauthorized: Invalid API Key');
      throw new Error('Unauthorized: Invalid API Key');
    }
    return { apiKey };
  },
});

async function startServer() {
  await server.start();
  
  server.applyMiddleware({ app, path: '/graphql' });

  // REST endpoint (kept for backward compatibility)
  app.get("/api/data", apiKeyAuth, async (req, res) => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Error fetching data" });
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`GraphQL endpoint: http://localhost:${port}${server.graphqlPath}`);
  });
}

startServer();