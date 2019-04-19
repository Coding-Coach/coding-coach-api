import "reflect-metadata";
import { Substitute } from "@fluffy-spoon/substitute";
import {
  ExecutionContext,
  BindingDefinition,
  HttpRequest
} from "@azure/functions";
import { Guid } from "guid-typescript";
import { MenteeEntity } from "@repositories/mentee-repository";
import { GetMentor } from "@handlers/get-mentor/get-mentor-handler";
import { Container } from "@container";
import { setup, menteeRepository } from "./setup";

const mentorId = Guid.create().toString();
const menteeId = Guid.create().toString();

beforeEach(async () => {
  setup();
});
test("Get Mentor", async () => {
  const expectedMentor = new MenteeEntity(menteeId, mentorId, "Gurpreet");
  menteeRepository.getMentor(menteeId).returns(Promise.resolve(expectedMentor));
  const request: HttpRequest = {
    query: {
      menteeId: menteeId
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
  const expectedJson = new MenteeEntity(menteeId, mentorId, "Gurpreet");
  const handler = Container.injector.get<GetMentor>(GetMentor).index;
  await handler(context, request);
  menteeRepository.received(1).getMentor(menteeId);
  expect(context.res.body).toEqual(JSON.stringify(expectedJson));
});
