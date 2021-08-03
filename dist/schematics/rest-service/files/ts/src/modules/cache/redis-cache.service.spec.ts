import { Test, TestingModule } from '@nestjs/testing';
import { RedisCache } from './redis-cache.service';
import { EnvironmentService } from '../environment/environment.service';

class RedisCacheMock {}

describe('Cache', () => {
  let service: RedisCache;
  let environmentService: EnvironmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: RedisCache,
          useClass: RedisCacheMock,
        },
        EnvironmentService,
      ],
    }).compile();

    service = module.get<RedisCache>(RedisCache);
    environmentService = module.get<EnvironmentService>(EnvironmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(environmentService).toBeDefined();
  });
});
