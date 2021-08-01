import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentData } from './interfaces/environment-data.interface';

@Injectable()
export class EnvironmentService {
  private envs: EnvironmentData;

  constructor() {
    const environment = process.env.NODE_ENV || 'development';
    let data: Record<string, any> = {};
    try {
      if (environment === 'development') {
        data = {
          ...dotenv.parse(fs.readFileSync('.env')),
          ...process.env,
        };
      } else {
        data = {
          ...data,
          ...process.env,
        };
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
    }

    data.APP_ENV = environment;
    data.APP_DEBUG = data.APP_DEBUG === 'true';
    data.RDS_PORT = parseInt(data.RDS_PORT, 10);

    this.envs = data as EnvironmentData;
  }

  getEnvs(): EnvironmentData {
    return this.envs;
  }

  getTypeORMEnvs(): TypeOrmModuleOptions {
    const typeOrmFolder = path.resolve(
      `${__dirname}/../../../../node_modules/rest-commons/dist/typeorm`,
    );
    return {
      type: this.envs.RDS_TYPE,
      host: this.envs.RDS_HOSTNAME,
      port: this.envs.RDS_PORT,
      username: this.envs.RDS_USERNAME,
      password: this.envs.RDS_PASSWORD,
      database: this.envs.RDS_DB_NAME,
      synchronize: false,
      entities: [
        `${typeOrmFolder}/entities/*.{js,ts}`,
        `${typeOrmFolder}/view-entities/*.{js,ts}`,
        `${typeOrmFolder}/domain-entities/*.{js,ts}`,
      ],
      subscribers: [`${__dirname}/../**.module/*-subscriber.{js,ts}`],
      migrations: [`${__dirname}/../migrations/*.{js,ts}`],
      options: {
        encrypt: true,
        // Prevent deprecation warning from MSSQL
        enableArithAbort: true,
      },
      logging: this.envs.APP_DEBUG,
    };
  }

  isDevelopment(): boolean {
    return this.envs.APP_ENV === 'development';
  }

  isProduction(): boolean {
    return this.envs.APP_ENV === 'production';
  }
}