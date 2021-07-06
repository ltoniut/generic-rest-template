import { Controller, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseControllerImpl } from 'northwind-rest-commons/dist/shared/baseModules/controller-impl';
import { <%= classify(name) %>Service, <%= classify(name) %>ServiceKey } from './interfaces';

const controllerPath = <% if (usePrefix) {%>'<%= lowercased(prefix) %>/<%=lowercased(name)%>';<% } else { %> '<%= lowercased(name)%>';<% } %>

@ApiTags(controllerPath)
@Controller(controllerPath)
export class <%= classify(name) %>ControllerImpl extends BaseControllerImpl {
  constructor(
    @Inject(<%= classify(name) %>ServiceKey)
    service: <%= classify(name) %>Service,
  ) {
    super(service, controllerPath);
  }
}