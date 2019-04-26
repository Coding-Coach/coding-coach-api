import 'reflect-metadata';
import { GraphQLModule } from '@graphql-modules/core';
import { AddMentee } from '@handlers/add-mentee/add-mentee-handler';
import { GetMentees } from '@handlers/get-mentees/get-mentees-handler';
import { GetMentor } from '@handlers/get-mentor/get-mentor-handler';
import { BoundaryModule } from './boundary-module';

const ApplicationModule = new GraphQLModule({
  providers: [AddMentee, GetMentees, GetMentor],
  imports: [BoundaryModule],
});

export { ApplicationModule };
