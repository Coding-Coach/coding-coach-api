import 'reflect-metadata';
import { GraphQLModule } from '@graphql-modules/core';
import { MenteeRepository } from '@repositories/mentee-repository';
import { MentorRepository } from '@repositories/mentor-repository';
import azurestorage from 'azure-storage';

const BoundaryModule = new GraphQLModule({
    providers: [
        {
            provide: 'IMenteeRepository',
            useClass: MenteeRepository,
        },
        {
            provide: 'IMentorRepository',
            useClass: MentorRepository,
        },
        {
            provide: 'TableService',
            useValue: new azurestorage.TableService('UseDevelopmentStorage=true'),
        },
    ],
});

export { BoundaryModule };
