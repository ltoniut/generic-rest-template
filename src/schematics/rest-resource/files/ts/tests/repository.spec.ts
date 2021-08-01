import { Test } from '@nestjs/testing';
import { getEntityManagerToken } from '@nestjs/typeorm';
import { mockManager } from 'rest-commons/dist/shared/tests/mock-factories';
import { EntityManager } from 'typeorm';
import { <%= classify(name) %>RepositoryKey } from '../interfaces';
import { <%= classify(name) %>RepositoryImpl } from '../repository';

describe('<%= classify(name) %>Repository', () => {
  const managerToken = getEntityManagerToken();
  let manager: EntityManager;
  let repository: <%= classify(name) %>RepositoryImpl;

  beforeEach(async () => {
    const testModule = await Test.createTestingModule({
      providers: [
        {
          provide: managerToken,
          useFactory: mockManager(),
        },
        {
          provide: <%= classify(name) %>RepositoryKey,
          useClass: <%= classify(name) %>RepositoryImpl,
        },
      ],
    }).compile();
    manager = testModule.get<EntityManager>(managerToken);
    repository = testModule.get<<%= classify(name) %>RepositoryImpl>(<%= classify(name) %>RepositoryKey);
  });

  it('Should be defined', () => {
    expect(manager).toBeDefined();
    expect(repository).toBeDefined();
  });
});
