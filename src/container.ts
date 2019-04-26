import 'reflect-metadata';
import { GraphQLModule } from '@graphql-modules/core';
import { ApplicationModule } from '@modules/application-module';

const Container = new GraphQLModule({
  imports: [ApplicationModule],
});

export { Container };
