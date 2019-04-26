class MentorEntity {
    public readonly PartitionKey: string;
    public readonly RowKey: string;
    public readonly MenteeName: string;
    constructor(mentorId: string, menteeId: string, public menteeName: string) {
        this.PartitionKey = mentorId;
        this.RowKey = menteeId;
        this.MenteeName = menteeName;
    }
}

export { MentorEntity };
