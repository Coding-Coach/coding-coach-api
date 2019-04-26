import 'reflect-metadata';
import { AzureFunction } from '@azure/functions';
import { GetMentor } from './get-mentor-handler';
import { Container } from '@container';

const index: AzureFunction = Container.injector.get<GetMentor>(GetMentor).index;
export { index };
