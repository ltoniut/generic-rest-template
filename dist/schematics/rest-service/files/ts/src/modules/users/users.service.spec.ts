import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Authrize } from 'northwind-rest-commons/dist/typeorm/entities';
import { UsersService } from './users.service';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const useAuthrize: () => Repository<Authrize> = jest.fn(() => ({
  findOne: jest.fn(),
}));

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Authrize),
          useFactory: useAuthrize,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
