// eslint-disable-next-line no-unused-vars
import { Inject } from '@nestjs/common';
import { BaseServiceImpl } from 'northwind-rest-commons/dist/shared/baseModules/service-impl';
import { <%= classify(name) %> } from 'northwind-rest-commons/dist/models/<%= classify(name) %>';
import { <%= classify(name) %>Repository, <%= classify(name) %>RepositoryKey } from './interfaces';

export class <%= classify(name) %>ServiceImpl extends BaseServiceImpl<<%= classify(name) %>, <%= classify(name) %>Repository> {
  constructor(
    @Inject(<%= classify(name) %>RepositoryKey)
    repository: <%= classify(name) %>Repository,
  ) {
    super('<%= classify(name) %>', repository);
  }
}
