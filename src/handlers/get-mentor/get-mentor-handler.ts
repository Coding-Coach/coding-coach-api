import 'reflect-metadata';
import { Inject, Injectable } from '@graphql-modules/di';
import { Context, HttpRequest } from '@azure/functions';
import { IMenteeRepository } from '@repositories/mentee-repository';

@Injectable()
class GetMentor {
    constructor(
    @Inject('IMenteeRepository') private menteeRepository: IMenteeRepository
    ) {}
    index = async (context: Context, req: HttpRequest): Promise<void> => {
        context.log('JavaScript HTTP trigger function processed a request.');
        const menteeId = req.query.menteeId;
        const mentees = await this.menteeRepository.getMentor(menteeId);

        context.res = {
            status: '200',
            body: JSON.stringify(mentees),
        };
    };
}

export { GetMentor };
