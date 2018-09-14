const getMentors = /* GraphQL */ `
  query getMentors {
    mentors {
      name
      type
    }
  }
`

const getMentees = /* GraphQL */ `
  query getMentees {
    mentees {
      name
      type
    }
  }
`

const createMentor = /* GraphQL */ `
  mutation createMentor($name: String!){
    createUser(data: {
      name: $name,
      type: Mentor
    }) {
      name
    }
  }
`

const createMentee = /* GraphQL */ `
  mutation createMentee($name: String!){
    createUser(data: {
      name: $name,
      type: Mentee
    }) {
      name
    }
  }
`

describe('Mentors', () => {
  test('Create mentor and mentee and retrieve them', async () => {
    await client.request(createMentor, { name: 'Mentor One' })
    await client.request(createMentor, { name: 'Mentor Two' })
    await client.request(createMentee, { name: 'Mentee One' })
    const { mentors } = await client.request(getMentors)
    const { mentees } = await client.request(getMentees)
    expect(mentors).toMatchSnapshot('getMentors')
    expect(mentors).toHaveLength(2)
    expect(mentees).toMatchSnapshot('getMentees')
    expect(mentees).toHaveLength(1)
  })
})
