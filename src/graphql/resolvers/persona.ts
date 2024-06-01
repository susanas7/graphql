import {IResolvers} from '@graphql-tools/utils';
import { PersonaDataSource } from '../../data/personadata';
import { Db } from 'mongodb';

const personaResolver: IResolvers = {
    Query: {
        obtenerPersona(){
            return PersonaDataSource;
        },
        obtenerPersonaEnMongo: async (parent, args, context: Db) => {
            try {
                return await context.collection('persona').find().toArray() ?? [];
            } catch (error) {
                console.log(error);
            }
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
        crearPersonaEnMongo: async (root: void, args: any, context: Db) => {
            try {
                const person = await context.collection('persona').insertOne(args.persona);
                return "Persona creada exitosamente";
            } catch (error) {
                console.log(error);
            }
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