import { Test } from '@nestjs/testing';
import { mockRepository } from 'rest-commons/dist/shared/tests/mock-factories';
import { loadSchemas } from 'rest-commons/dist/schemas/model-builders';
import { <%= classify(name) %>Repository, <%= classify(name) %>RepositoryKey } from '../interfaces';
import { <%= classify(name) %>ServiceImpl } from '../service';

loadSchemas();
describe('<%= classify(name) %>Service', () => {
  let repository: <%= classify(name) %>Repository;
  let service: <%= classify(name) %>ServiceImpl;

  beforeEach(async () => {
    const testModule = await Test.createTestingModule({
      providers: [
        <%= classify(name) %>ServiceImpl,
        {
          provide: <%= classify(name) %>RepositoryKey,
          useFactory: mockRepository(),
        },
      ],
    }).compile();

    repository = testModule.get<<%= classify(name) %>Repository>(<%= classify(name) %>RepositoryKey,);
    service = testModule.get<<%= classify(name) %>ServiceImpl>(<%= classify(name) %>ServiceImpl);  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(service).toBeDefined();
  });
});
