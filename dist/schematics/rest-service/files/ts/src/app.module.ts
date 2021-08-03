import { Module, CacheModule, DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { I18nModule, I18nJsonParser, HeaderResolver } from 'nestjs-i18n';

import { EnvironmentModule } from 'modules/environment/environment.module';
import { EnvironmentService } from 'modules/environment/environment.service';
import { loadSchemas } from 'rest-commons/dist/schemas/model-builders';

import { AppController } from 'app.controller';
import { AppService } from 'app.service';

const cacheImports: DynamicModule[] = [];
loadSchemas();

if (process.env.ENABLE_CACHE) {
  cacheImports.push(
    CacheModule.registerAsync({
      imports: [EnvironmentModule],
      useFactory: async (environmentService: EnvironmentService) => {
        const {
          REDIS_HOST,
          REDIS_PORT,
          REDIS_PASSWORD,
        } = environmentService.getEnvs();
        return {
          store: redisStore,
          host: REDIS_HOST,
          port: REDIS_PORT,
          ttl: 10,
          password: REDIS_PASSWORD,
        };
      },
      inject: [EnvironmentService],
    }),
  );
}
@Module({
  imports: [
    ...cacheImports,
    ConfigModule.forRoot({ isGlobal: true }),
    // ResourceModule,
    // LinksModule,
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentModule],
      useFactory: async (environmentService: EnvironmentService) =>
        environmentService.getTypeORMEnvs(),
      inject: [EnvironmentService],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser,
      parserOptions: {
        path: `${__dirname}/i18n/`,
        watch: true,
      },
      resolvers: [new HeaderResolver(['lang'])],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
