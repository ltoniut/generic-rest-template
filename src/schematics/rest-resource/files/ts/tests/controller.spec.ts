import { Test } from '@nestjs/testing';
import { mockService } from 'rest-commons/dist/shared/tests/mock-factories';
import {} from 'rest-commons/dist/shared/tests/baseMocks';
import { <%= classify(name) %>ControllerImpl } from '../controller';
import {
  <%= classify(name) %>Controller,
  <%= classify(name) %>ControllerKey,
  <%= classify(name) %>Service,
  <%= classify(name) %>ServiceKey,
} from '../interfaces';

describe('<%= classify(name) %>Controller', () => {
  let service: <%= classify(name) %>Service;
  let controller: <%= classify(name) %>Controller;

  beforeEach(async () => {
    const testModule = await Test.createTestingModule({
      providers: [
        {
          provide: <%= classify(name) %>ServiceKey,
          useFactory: mockService(),
        },
        {
          provide: <%= classify(name) %>ControllerKey,
          useClass: <%= classify(name) %>ControllerImpl,
        },
      ],
    }).compile();
    service = testModule.get<<%= classify(name) %>Service>(<%= classify(name) %>ServiceKey);
    controller = testModule.get<<%= classify(name) %>Controller>(<%= classify(name) %>ControllerKey,);
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });
});
