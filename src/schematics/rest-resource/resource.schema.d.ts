import { Path } from '@angular-devkit/core';

export interface ResourceOptions {
  /**
   * The name of the resource.
   */
  name: string;
  /**
   * Use an admin prefix ?
   */
  usePrefix: boolean;
  /**
   * The admin prefix
   */
  prefix?: string;
  /**
   * The input type, either a file ar an entity.
   */
  inputType: number;
  /**
   * The path to create the resource.
   */
   path?: string | Path;
  /**
   * Application language.
   */
   language?: string;
  /**
   * Specifies if spec files are generated.
   */
   spec?: boolean;
  /**
   * The path to insert the module declaration.
   */
   module?: Path;
  /**
   * Metadata name affected by declaration insertion.
   */
   metadata?: string;
  /**
   * Directive to insert declaration in module.
   */
   skipImport?: boolean;
}
