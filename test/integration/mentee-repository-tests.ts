import "reflect-metadata";
import { Guid } from "guid-typescript";

import { Setup } from "./setup";
import {
  MenteeRepository,
  IMenteeRepository,
  MenteeEntity
} from "@repositories/mentee-repository";
import { TestMenteeRepository } from "./repositories/test-mentee-repository";
import { TestMenteeEntity } from "./models/test-mentee-entity";
import { TestContainer } from "./test-container";
import Retry from "async-retry";

describe("mentee repository tests", () => {
  const setup = new Setup();
  let menteeRepository!: IMenteeRepository;
  let testMenteeRepository!: TestMenteeRepository;

  beforeAll(async () => {
    jest.setTimeout(100000);
    await setup.initialize();

    menteeRepository = TestContainer.injector.get<IMenteeRepository>(
      "IMenteeRepository"
    );
    testMenteeRepository = TestContainer.injector.get<TestMenteeRepository>(
      "TestMenteeRepository"
    );

    await setup.createAzureStorageTables(menteeRepository.tableName);
  });
  test("When AddMentor is called", async () => {
    const menteeId = Guid.create().toString();
    const mentorId = Guid.create().toString();
    const mentorName = "Gurpreet";
    const mentee = new MenteeEntity(menteeId, mentorId, mentorName);
    await menteeRepository.addMentor(mentee);

    const expectedMentee = new TestMenteeEntity(menteeId, mentorId, mentorName);
    const actualMentee = await testMenteeRepository.getMentor(menteeId);

    expect(actualMentee).toMatchObject(expectedMentee);
  });

  afterAll(async () => {
    await setup.dispose();
  });
});
