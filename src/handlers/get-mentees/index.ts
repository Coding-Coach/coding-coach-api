import 'reflect-metadata';
import { AzureFunction } from '@azure/functions';
import { GetMentees } from './get-mentees-handler';
import { Container } from '@container';

const index: AzureFunction = Container.injector.get<GetMentees>(GetMentees)
    .index;
export { index };
