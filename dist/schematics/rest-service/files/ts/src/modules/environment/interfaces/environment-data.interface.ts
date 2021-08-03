export interface EnvironmentData {
  // TypeORM Envs
  // RDS_ prefix due to get RDS database working on AWS automatically
  RDS_TYPE: 'postgres' | 'mysql' | 'mssql';
  RDS_HOSTNAME: string;
  RDS_DB_NAME: string;
  RDS_PORT: number;
  RDS_USERNAME: string;
  RDS_PASSWORD: string;

  // Application Envs
  APP_ENV?: string;
  APP_DEBUG?: boolean;
  GLOBAL_ROUTES_PREFIX: string;

  // Redis Envs
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASSWORD?: string;
}
