import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Authrize } from 'northwind-rest-commons/dist/typeorm/entities/Authrize';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const useAuthrize: () => Repository<Authrize> = jest.fn(() => ({
  findOne: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: getRepositoryToken(Authrize),
          useFactory: useAuthrize,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
