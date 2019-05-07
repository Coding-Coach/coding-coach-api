import 'reflect-metadata';
import { AzureFunction } from '@azure/functions';
import { AddUser } from './add-user-handler';
import { Container } from '@container';

const index: AzureFunction = Container.injector.get(AddUser).index;

export { index };
