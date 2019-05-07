import 'reflect-metadata';
import { AzureFunction } from '@azure/functions';
import { GetUsers } from './get-users-handler';
import { Container } from '@container';

const index: AzureFunction = Container.injector.get(GetUsers).index;

export { index };
