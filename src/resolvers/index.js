import path from 'path';
import { fileLoader, mergeResolvers } from 'merge-graphql-schemas';

const resolversArray = fileLoader(path.join(__dirname, './'));

/*
Beware that mergeResolvers is simply merging plain Javascript objects together.
This means that you should be careful with
Queries, Mutations or Subscriptions with naming conflicts.
*/

export default mergeResolvers(resolversArray);
