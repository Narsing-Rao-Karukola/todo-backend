import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoStatusDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { UpdateTodoTitleDto } from './dto/update-todo-title.dto';
import { TodoService } from './entities/todo.repository';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    private todoHelperService: TodoService,
  ) {}

  async getTodo(user: User): Promise<Todo[]> {
    const query = this.todoRepository.createQueryBuilder('todo');
    query.where('todo.userId = :userId', { userId: user.id });

    const todos = await query.getMany();
    return todos;
  }

  async getTodoById(id: number, user: User): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID "${id}" not found`);
    }
    return todo;
  }

  async createTodo(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
    return this.todoHelperService.createTodo(createTodoDto, user);
  }

  async deleteTodo(id: number, user: User): Promise<void> {
    const result = await this.todoHelperService.deleteTodo(id, user);

    if (result.affected === 0) {
      throw new NotFoundException(`Todo with ID "${id}" not found`);
    }
  }

  async updateTodoStatus(
    id: number,
    updateTodoStatusDto: UpdateTodoStatusDto,
    user: User,
  ): Promise<Todo> {
    const { completed } = updateTodoStatusDto;
    const todo = await this.getTodoById(id, user);
    todo.completed = completed;
    await this.todoRepository.update({ id }, todo);
    return todo;
  }

  async updateTodoTitle(
    id: number,
    updateTodoTitleDto: UpdateTodoTitleDto,
    user: User,
  ): Promise<Todo> {
    const { title } = updateTodoTitleDto;
    const todo = await this.getTodoById(id, user);
    todo.title = title;
    await this.todoRepository.update({ id }, todo);
    return todo;
  }
}
