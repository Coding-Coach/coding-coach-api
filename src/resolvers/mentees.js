import { User } from '../models';

export default {
  Query: {
    mentees: async () => {
      return User.find({
        $or: [
          {
            type: 'Mentee',
          },
          {
            type: 'Both',
          },
        ],
      });
    },
    mentee: async (id) => {
      return User.findOne({
        id,
        $or: [
          {
            type: 'Mentee',
          },
          {
            type: 'Both',
          },
        ],
      });
    },
  },
};
