import "reflect-metadata";
import { GraphQLModule } from "@graphql-modules/core";
import { BoundaryModule } from "@modules/boundary-module";
import { TestModule } from "./test-module";

const TestContainer = new GraphQLModule({
  imports: [BoundaryModule, TestModule]
});

export { TestContainer };
