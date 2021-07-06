import { Module, Global } from '@nestjs/common';
import { RedisCache } from './redis-cache.service';
import { EnvironmentService } from '../environment/environment.service';

@Module({
  providers: [RedisCache, EnvironmentService],
  exports: [RedisCache],
})
@Global()
export class RedisCacheModule {}
