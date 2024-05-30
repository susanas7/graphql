import {GraphQLSchema} from 'graphql';
import {makeExecutableSchema} from 'graphql-tools';
import mergeTypeDefs from 'graphql-tools-merge-typedefs';
import 'graphql-import-node';
import  perroSchema from './schemas/perro.graphql';
import  personaShema from './schemas/persona.graphql';
import personaResolver from "./resolvers/persona";
import perroResolver from "./resolvers/perro";


export const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([
        perroSchema,
        personaShema
    ]),
    resolvers: [personaResolver, perroResolver]
});