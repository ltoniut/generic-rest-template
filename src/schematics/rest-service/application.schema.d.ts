export interface ApplicationOptions {
  /**
   * Nest application name.
   */
  name: string;
  /**
   * Nest application port
   */
  port: number;
  /**
   * Nest application author.
   */
  author: string;
  /**
   * Nest application description.
   */
  description?: string;
  /**
   * Nest application destination directory
   */
  directory?: string;
  /**
   * Nest application version.
   */
  version?: string;
  /**
   * Application language.
   */
  language?: string;
  /**
   * Wheter to override persistence default settings or not
   */
  persistence?: boolean;
  /**
   * RDS hostname
   */
  rdsHostName?: string;
  /**
   * RDS username
   */
  rdsUsername?: string;
  /**
   * RDS password
   */
  rdsPassword?: string;
  /**
   * RDS database name
   */
  rdsDbName?: string;
  /**
   * RDS port
   */
  rdsDbPort?: number;
}
