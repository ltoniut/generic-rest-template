import { Injectable } from '@nestjs/common';
import * as redis from 'redis';
import { RedisClient } from 'redis';
import { EnvironmentService } from '../environment/environment.service';

@Injectable()
export class RedisCache {
  client: RedisClient;

  /**
   * Instantiate the redis client
   */
  constructor(private envService: EnvironmentService) {
    const {
      REDIS_HOST,
      REDIS_PORT,
      REDIS_PASSWORD,
    } = this.envService.getEnvs();

    this.client = redis.createClient({
      host: REDIS_HOST,
      port: REDIS_PORT,
      password: REDIS_PASSWORD,
    });
  }

  get(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) {
          reject(err);
        }
        if (reply) {
          resolve(JSON.parse(reply));
        }
      });
    });
  }

  put(key: string, data: any): void {
    this.client.set(key, JSON.stringify(data));
  }
}
