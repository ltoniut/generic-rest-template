import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authrize } from 'northwind-rest-commons/dist/typeorm/entities';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Authrize])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
