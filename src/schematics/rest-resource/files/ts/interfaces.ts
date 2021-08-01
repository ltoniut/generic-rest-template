import { BaseController } from 'rest-commons/dist/shared/baseModules/controller';
import { BaseService } from 'rest-commons/dist/shared/baseModules/service';
import { BaseRepository } from 'rest-commons/dist/shared/baseModules/repository';
<% const entityHelper = new EntityHelper(classify(name)) %>
import { <%= entityHelper.getEntityName() %> } from '<%= entityHelper.getPath() %>';

export const <%= classify(name) %>ControllerKey = '<%= classify(name) %>Controller';
export const <%= classify(name) %>ServiceKey = '<%= classify(name) %>Service';
export const <%= classify(name) %>RepositoryKey = '<%= classify(name) %>Repository';

export interface <%= classify(name) %>Controller extends BaseController {}
export interface <%= classify(name) %>Service extends BaseService {}
export interface <%= classify(name) %>Repository extends BaseRepository<<%= entityHelper.getEntityName() %>> {}
