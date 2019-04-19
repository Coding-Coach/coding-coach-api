import "reflect-metadata";
import { Substitute } from "@fluffy-spoon/substitute";
import {
  ExecutionContext,
  BindingDefinition,
  HttpRequest
} from "@azure/functions";
import { Guid } from "guid-typescript";
import { setup, mentorRepository } from "./setup";
import { MentorEntity } from "@repositories/mentor-repository";
import { GetMentees } from "@handlers/get-mentees/get-mentees-handler";
import { Container } from "@container";

const mentorId = Guid.create().toString();
const menteeId = Guid.create().toString();

beforeEach(async () => {
  setup();
});
test("Get Mentees", async () => {
  const expectedMentees = [new MentorEntity(mentorId, menteeId, "Gurpreet")];
  mentorRepository
    .getMentees(mentorId)
    .returns(Promise.resolve(expectedMentees));
  const request: HttpRequest = {
    query: {
      mentorId: mentorId
    },
    method: "GET",
    url: "",
    headers: {},
    params: {}
  };
  const context = {
    invocationId: "",
    executionContext: Substitute.for<ExecutionContext>(),
    bindingData: {},
    bindingDefinitions: [Substitute.for<BindingDefinition>()],
    done: () => {},
    log: Object.assign(() => {}, {
      error: () => {},
      warn: () => {},
      info: () => {},
      verbose: () => {}
    }),
    bindings: {},
    res: {
      status: 200 /* Defaults to 200 */,
      body: ""
    }
  };
  const expectedJson: MentorEntity[] = [
    new MentorEntity(mentorId, menteeId, "Gurpreet")
  ];
  const handler = Container.injector.get<GetMentees>(GetMentees).index;
  await handler(context, request);
  mentorRepository.received(1).getMentees(mentorId);
  expect(context.res.body).toEqual(JSON.stringify(expectedJson));
});
