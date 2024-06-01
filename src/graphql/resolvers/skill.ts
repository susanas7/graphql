import { IResolvers } from '@graphql-tools/utils';
import { peopleDataSource } from '../../data/peopledata';
import { Db, ObjectId } from 'mongodb';

const skillResolver: IResolvers = {
    Query: {
        getSkills: async (parent, args, context: Db) => {
            try {
                return await context.collection('Skills').find().toArray() ?? [];
            } catch (error) {
                console.log(error);
            }
        }       
    },
    Mutation: {
        createSkill: async (parent, args, context: Db) => {
            try {
              await context.collection('Skills').insertOne(args.skill);
              return "Skill created successfully";
            } catch (error) {
              console.log(error);
            }
        },
        updateSkill: async (parent, args, context: Db) => {
            try {
                console.log(args);
                const skillColl= await context.collection('Skills').findOne({ _id: new ObjectId(args._id) });

                if(!skillColl) throw new Error("Skills not found");
                console.log("validando skillColl");

                await context.collection('Skills').updateOne(
                    { _id: new ObjectId(args._id) },
                    { $set: args.skill }
                  );

                return "Skill updated successfully";
            } catch (error) {
                console.log(error);
            }
        },
    }
}




export default skillResolver;