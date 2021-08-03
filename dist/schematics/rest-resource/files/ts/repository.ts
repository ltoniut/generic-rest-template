import { InjectEntityManager } from '@nestjs/typeorm';
import { TypeORMRepository } from 'rest-commons/dist/shared/baseModules/repository-typeorm';
<% const entityHelper = new EntityHelper(classify(name)) %>
import { <%= entityHelper.getEntityName() %> } from '<%= entityHelper.getPath() %>';
import { EntityManager } from 'rest-commons/node_modules/typeorm';
// eslint-disable-next-line no-unused-vars

export class <%= classify(name) %>RepositoryImpl extends TypeORMRepository<<%= entityHelper.getEntityName() %>> {
  constructor(
    @InjectEntityManager()
    manager: EntityManager,
  ) {
    super(
      <%= entityHelper.getEntityName() %>,
      [<%= entityHelper.getIndexes().map(value => `'${value}'`).join(', ') %>],
      [<%= entityHelper.getIndexes().map(value => `'${value}'`).join(', ') %>],
      manager,
      <%= entityHelper.getRelations() %>
    );
  }
}
