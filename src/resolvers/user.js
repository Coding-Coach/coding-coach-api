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
        firstName: name.split(' ')[0],
        lastName: name.split(' ')[1],
        type,
      });
    },
  },
  User: {
    name: ({ firstName, lastName }) => `${firstName} ${lastName}`,
  },
};
