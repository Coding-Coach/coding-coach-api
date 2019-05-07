import { Injectable, Inject } from '@graphql-modules/di';
import { User } from './User';
import { TableService, TableQuery } from 'azure-storage';

export interface IUserRepository {
  save(user: User): Promise<void>;
  find(): Promise<User[]>;
  tableName: string;
}

@Injectable()
class UserRepository implements IUserRepository {
  public tableName: string = 'userentity';

  constructor(@Inject('TableService') private tableService: TableService) {
    this.tableService.doesTableExist(this.tableName, (error, result) => {
      if (!result.exists) {
        this.tableService.createTable(this.tableName, (error, result) => {
          console.log(error);
          console.log(result);
        });
      }
    });
  }

  public async save(user: User): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tableService.insertEntity<User>(
        this.tableName,
        user,
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        }
      );
    });
  }

  // @TODO: Add filters as a parameter, for now we are just returning
  // all users, but ideally we should use the filters we have in the alpha site
  public async find(/* filters: object */): Promise<User[]> {
    return new Promise((resolve, reject) => {
      const query = new TableQuery();
      this.tableService.queryEntities<User>(
        this.tableName,
        query,
        null,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.entries);
          }
        }
      );
    });
  }
}

export { UserRepository };
