class MenteeEntity {
  public readonly PartitionKey: string;
  public readonly RowKey: string;
  public readonly MentorName: string;
  constructor(menteeId: string, mentorId: string, mentorName: string) {
    this.PartitionKey = menteeId;
    this.RowKey = mentorId;
    this.MentorName = mentorName;
  }
}

export { MenteeEntity };
