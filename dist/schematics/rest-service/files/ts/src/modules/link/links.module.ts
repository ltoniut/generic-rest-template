import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LinksService } from './links.service';
import { Link } from './link.entity';
import { LinkController } from './link.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  providers: [LinksService],
  controllers: [LinkController],
})
export class LinksModule {}
