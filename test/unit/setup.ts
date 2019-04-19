import { BoundaryModule } from "@modules/boundary-module";
import Substitute from "@fluffy-spoon/substitute";
import { IMentorRepository } from "@repositories/mentor-repository";
import { IMenteeRepository } from "@repositories/mentee-repository";

const mentorRepository = Substitute.for<IMentorRepository>();
const menteeRepository = Substitute.for<IMenteeRepository>();

const setup = function() {
  BoundaryModule.injector.provide({
    provide: "IMentorRepository",
    useValue: mentorRepository,
    overwrite: true
  });

  BoundaryModule.injector.provide({
    provide: "IMenteeRepository",
    useValue: menteeRepository,
    overwrite: true
  });
};

export { setup, menteeRepository, mentorRepository };
