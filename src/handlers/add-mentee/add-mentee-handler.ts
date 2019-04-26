import 'reflect-metadata';
import { Context, HttpRequest } from '@azure/functions';
import {
  IMentorRepository,
  MentorEntity,
} from '@repositories/mentor-repository';
import { Inject, Injectable } from '@graphql-modules/di';

@Injectable()
class AddMentee {
  constructor(
    @Inject('IMentorRepository') private mentorRepository: IMentorRepository
  ) {}
  index = async (context: Context, req: HttpRequest): Promise<void> => {
    context.log('JavaScript HTTP trigger function processed a request.');

    const mentorId = req.query.mentorId;
    const menteeId = req.query.menteeId;

    const mentor = new MentorEntity(mentorId, menteeId, 'Gurpreet');

    await this.mentorRepository.addMentee(mentor);

    context.res = {
      status: '200',
    };
  };
}

export { AddMentee };
