import { TableService, TableQuery } from "azure-storage";
import { TestMenteeEntity } from "../models/test-mentee-entity";
import { Injectable, Inject } from "@graphql-modules/di";

@Injectable()
class TestMenteeRepository {
  public tableName: string = "menteeentity";
  constructor(@Inject("TableService") private tableService: TableService) {}
  async getMentor(menteeId: string): Promise<TestMenteeEntity> {
    return new Promise<TestMenteeEntity>((resolve, reject) => {
      const query = new TableQuery()
        .top(1)
        .where("PartitionKey eq ?", menteeId);
      this.tableService.queryEntities<TestMenteeEntity>(
        this.tableName,
        query,
        null,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            const entity = result.entries[0];
            resolve(this.tableRecordToJavacript(entity));
          }
        }
      );
    });
  }

  tableRecordToJavacript(entity: {}) {
    let result: any = {};
    Object.keys(entity).forEach(k => {
      // we do not want to decode metadata
      if (k !== ".metadata") {
        let prop = Object.getOwnPropertyDescriptor(entity, k);
        if (prop) {
          result[k] = prop.value["_"];
        }
      }
    });
    return result;
  }
}

export { TestMenteeRepository };
