import { User } from '../models';

export default {
  Query: {
    mentors: async () => {
      return User.find({
        $or: [
          {
            type: 'Mentor',
          },
          {
            type: 'Both',
          },
        ],
      });
    },
    mentor: async (id) => {
      return User.findOne({
        id,
        $or: [
          {
            type: 'Mentor',
          },
          {
            type: 'Both',
          },
        ],
      });
    },
  },
};
