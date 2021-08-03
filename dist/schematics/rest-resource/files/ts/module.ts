import { Module } from '@nestjs/common';
import { <%= classify(name) %>ControllerImpl } from './controller';
import { <%= classify(name) %>RepositoryKey, <%= classify(name) %>ServiceKey } from './interfaces';
import { <%= classify(name) %>RepositoryImpl } from './repository';
import { <%= classify(name) %>ServiceImpl } from './service';
@Module({
  controllers: [<%= classify(name) %>ControllerImpl],
  providers: [
    {
      provide: <%= classify(name) %>RepositoryKey,
      useClass: <%= classify(name) %>RepositoryImpl,
    },
    {
      provide: <%= classify(name) %>ServiceKey,
      useClass: <%= classify(name) %>ServiceImpl,
    },
  ],
})
export class <%= classify(name) %>Module {}
