
export default `
  type Lesson {
    name: String
    taughtby: Mentor
    tags: [String]
  }

  type Query {
    lessons: [Lesson]
    lesson(id: ID!): Lesson
  }
`;