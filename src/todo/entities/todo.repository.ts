import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  @InjectRepository(Todo) private todoRepository: Repository<Todo>;

  async createTodo(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
    const { title, completed } = createTodoDto;

    const todo = new Todo();
    todo.title = title;
    todo.completed = completed;
    todo.user = user;
    await this.todoRepository.save(todo);

    return todo;
  }

  async deleteTodo(id: number, user: User): Promise<any> {
    const result = await this.todoRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Todo with ID "${id}" not found`);
    }
    return result;
  }
}
