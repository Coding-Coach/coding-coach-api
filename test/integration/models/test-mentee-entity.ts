class TestMenteeEntity {
  public PartitionKey: string;
  public RowKey: string;
  public MentorName: string;
  constructor(menteeId: string, mentorId: string, mentorName: string) {
    this.PartitionKey = menteeId;
    this.RowKey = mentorId;
    this.MentorName = mentorName;
  }
}

export { TestMenteeEntity };
