import { GraphQLModule } from "@graphql-modules/core";
import { TestMenteeRepository } from "./repositories/test-mentee-repository";

const TestModule = new GraphQLModule({
  providers: [
    {
      provide: "TestMenteeRepository",
      useClass: TestMenteeRepository
    }
  ]
});

export { TestModule };
