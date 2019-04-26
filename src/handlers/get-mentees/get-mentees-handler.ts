import 'reflect-metadata';
import { Inject, Injectable } from '@graphql-modules/di';
import { Context, HttpRequest } from '@azure/functions';
import { IMentorRepository } from '@repositories/mentor-repository/mentor-repository';

@Injectable()
class GetMentees {
  constructor(
    @Inject('IMentorRepository') private mentorRepository: IMentorRepository
  ) {}
  index = async (context: Context, req: HttpRequest): Promise<void> => {
    context.log('JavaScript HTTP trigger function processed a request.');
    const mentorId = req.query.mentorId;
    const mentees = await this.mentorRepository.getMentees(mentorId);

    context.res = {
      status: '200',
      body: JSON.stringify(mentees),
    };
  };
}

export { GetMentees };
