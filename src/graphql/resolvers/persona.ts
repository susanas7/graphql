import {IResolvers} from '@graphql-tools/utils';
import { PersonaDataSource } from '../../data/personadata';

const personaResolver: IResolvers = {
    Query: {
        obtenerPersona(){
            return PersonaDataSource;
        }
    }
}



export default personaResolver;