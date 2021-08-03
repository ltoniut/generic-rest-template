import { SetMetadata, CustomDecorator } from '@nestjs/common';

export const CACHE_CLEAR_METADATA = 'cache_module:cache_clear';
export const CACHE_DISABLE_METADATA = 'cache_module:cache_disable';

/**
 * Hints the Cache Interceptor to clear the cache for this endpoint/route before returning the response.
 * @param value Clear the cache or not? (defult: true)
 */
export const CacheClear = (value?: boolean): CustomDecorator<string> =>
  SetMetadata(CACHE_CLEAR_METADATA, value === undefined ? true : value);

/**
 * Hints the Cache Interceptor to disable the use of cache for this endpoint/route
 * @param value Disable cache or not? (default: true)
 */
export const CacheDisable = (value?: boolean): CustomDecorator<string> =>
  SetMetadata(CACHE_DISABLE_METADATA, value === undefined ? true : value);
