import {IResolvers} from '@graphql-tools/utils';
import { PersonaDataSource } from '../../data/personadata';

const personaResolver: IResolvers = {
    Query: {
        obtenerPersona(){
            return PersonaDataSource;
        },
        obtenerPersonaPorNombre: (parent, { nombre }) => {
            return PersonaDataSource.filter(PersonaDataSource => PersonaDataSource.nombre.toLowerCase().includes(nombre.toLowerCase()));
        }
    },
    Mutation: {
        crearPersona: (parent, { input }) => {
            const newPerson = {
                id: String(PersonaDataSource.length + 1),
                ...input
            };
            PersonaDataSource.push(newPerson);
            return newPerson;
        },
        actualizarPersona: (parent, { id, input }) => {
            const personIndex = PersonaDataSource.findIndex(person => person.id === id);
            if (personIndex !== -1) {
                const updatedPersona = {
                    id,
                    ...input
                };
                PersonaDataSource[personIndex] = updatedPersona;
                return updatedPersona;
            }
            throw new Error("Persona not found");
        },
        eliminarPersona: (parent, { id }) => {
            const personIndex = PersonaDataSource.findIndex(person => person.id === id);
            if (personIndex !== -1) {
                PersonaDataSource.splice(personIndex, 1);
                return true;
            }
            throw new Error("Persona not found");
        }
    }
}



export default personaResolver;