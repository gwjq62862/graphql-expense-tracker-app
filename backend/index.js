import http from 'http';
import cors from 'cors';
import express from 'express';
import path from 'path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import mergedResolvers from './resolvers/index.js';
import mergedTypeDef from './typeDefs/index.js';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import dotenv from "dotenv"
import { connectDb } from './db/connectDb.js';


dotenv.config() 
const __dirname=path.resolve()
const app = express();
//we created http server which is best pratiese
const httpServer=http.createServer(app)
const server = new ApolloServer({
  typeDefs: mergedTypeDef,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});


await server.start();
await connectDb()
app.use(
  '/graphql',
  cors(),
  express.json(),
  expressMiddleware(server),
);
app.use(express.static(path.join(__dirname,"frontend/dist")))
//npm run build will build our frontend application so it will optimized our app of version
app.get(/.*/, (req, res) => {
  res.sendFile(new URL('../frontend/dist/index.html', import.meta.url).pathname);
});
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(` Server ready at http://localhost:4000/graphql`);