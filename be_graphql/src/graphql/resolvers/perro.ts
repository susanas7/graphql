import {IResolvers} from '@graphql-tools/utils';
import { PerroDataSource } from '../../data/perrodata';

const perroResolver: IResolvers = {
    Query: {
        obtenerPerro(){
            return PerroDataSource;
        }
    }
}



export default perroResolver;