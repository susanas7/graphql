import {IResolvers} from '@graphql-tools/utils';
import { PersonaDataSource } from '../../datasource';

const resolver: IResolvers = {
    Query: {
        hello(_, { name }){
            return name ? `Hello, ${name}!` : "Hello, world!";
        },
        obtenerPersona(){
            return PersonaDataSource;
        }
    }
}



export default resolver;