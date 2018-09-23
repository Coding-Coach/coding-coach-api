import { User } from '../models';

export default {
  Mutation: {
    async createUser(
      root,
      {
        data: { name, type },
      },
    ) {
      return User.create({
        name,
        type,
      });
    },
  },
};
