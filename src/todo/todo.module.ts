import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { TodoService } from './entities/todo.repository';
import { TodoController } from './todo.controller';
import { TodosService } from './todo.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Todo]),
  ],
  controllers: [TodoController],
  providers: [TodoService, TodosService],
})
export class TodoModule {}
