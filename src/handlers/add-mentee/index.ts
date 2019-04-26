import 'reflect-metadata';
import { AzureFunction } from '@azure/functions';
import { AddMentee } from './add-mentee-handler';
import { Container } from '@container';

const index: AzureFunction = Container.injector.get(AddMentee).index;
export { index };
