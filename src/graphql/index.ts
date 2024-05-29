import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import 'graphql-import-node';
import * as rootSchema from './schemas/schema.graphql';

export const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs: [
        rootSchema
    ]
});
