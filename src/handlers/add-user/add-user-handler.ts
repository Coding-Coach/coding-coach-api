import 'reflect-metadata';
import uuidv1 from 'uuid/v1';
import { Context, HttpRequest } from '@azure/functions';
import { Inject, Injectable } from '@graphql-modules/di';
import { IUserRepository, User } from '@repositories/user-repository';

@Injectable()
class AddUser {
  constructor(@Inject('IUserRepository') private userRepository: IUserRepository) {
    // Nothing to do here
  }

  index = async (context: Context, req: HttpRequest): Promise<void> => {
    const user = new User({
      // @TODO: for now using an uuid, but we want to use auth0 Ids to setup this value
      userId: uuidv1(),
      ...req.body,
    });

    await this.userRepository.save(user);

    context.res = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        success: true,
        message: 'Successfully added',
        user,
      },
    };
  };
}

export { AddUser };
