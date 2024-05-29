import cors from "cors";
import express, { Application } from 'express';
import { ApolloServer } from "apollo-server-express";
import { schema } from "./graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const app: Application = express();

app.use(cors());
const server = new ApolloServer({
    schema,
    introspection: true,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
});

server.start().then(() => {
    //server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () => {
        console.log('🚀 Server ready at http://localhost:4000' + server.graphqlPath);
    });
});

