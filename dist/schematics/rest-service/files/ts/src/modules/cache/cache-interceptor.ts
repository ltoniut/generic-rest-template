import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Inject, Injectable, Optional } from '@nestjs/common/decorators';
import {
  CallHandler,
  ExecutionContext,
  HttpServer,
  NestInterceptor,
} from '@nestjs/common/interfaces';
import { isNil } from '@nestjs/common/utils/shared.utils';
import { CACHE_MANAGER } from '@nestjs/common';
import {
  CACHE_TTL_METADATA,
  CACHE_KEY_METADATA,
} from '@nestjs/common/cache/cache.constants';
import {
  CACHE_DISABLE_METADATA,
  CACHE_CLEAR_METADATA,
} from './cache-decorators';

const HTTP_ADAPTER_HOST = 'HttpAdapterHost';
const REFLECTOR = 'Reflector';

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface HttpAdapterHost<T extends HttpServer = any> {
  httpAdapter: T;
}

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  @Optional()
  @Inject(HTTP_ADAPTER_HOST)
  protected readonly httpAdapterHost: HttpAdapterHost;

  constructor(
    @Inject(CACHE_MANAGER) protected readonly cacheManager: any,
    @Inject(REFLECTOR) protected readonly reflector: any,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ttl =
      this.reflector.get(CACHE_TTL_METADATA, context.getHandler()) || null;
    const disabled: boolean | undefined =
      this.reflector.get(CACHE_DISABLE_METADATA, context.getHandler()) ||
      undefined;
    const clear: boolean | undefined =
      this.reflector.get(CACHE_CLEAR_METADATA, context.getHandler()) ||
      undefined;
    const key = this.trackBy(context, !clear);

    if (!clear && (!key || disabled)) {
      return next.handle();
    }
    try {
      const value = await this.cacheManager.get(key);
      if (value && !clear) {
        return of(value);
      }

      return next.handle().pipe(
        tap(response => {
          if (clear) {
            this.cacheManager.del(key);
          } else {
            const args = isNil(ttl)
              ? [key, response]
              : [key, response, { ttl }];
            this.cacheManager.set(...args);
          }
        }),
      );
    } catch {
      return next.handle();
    }
  }

  trackBy(context: ExecutionContext, onlyGet: boolean): string | undefined {
    // eslint-disable-next-line prefer-destructuring
    const httpAdapter = this.httpAdapterHost.httpAdapter;
    const isHttpApp = httpAdapter && !!httpAdapter.getRequestMethod;
    const cacheMetadata = this.reflector.get(
      CACHE_KEY_METADATA,
      context.getHandler(),
    );

    if (!isHttpApp || cacheMetadata) {
      return cacheMetadata;
    }

    const request = context.getArgByIndex(0);
    if (onlyGet && httpAdapter.getRequestMethod(request) !== 'GET') {
      return undefined;
    }
    return httpAdapter.getRequestUrl(request);
  }
}
