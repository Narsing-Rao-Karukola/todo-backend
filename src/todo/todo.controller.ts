import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/auth-utils/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoStatusDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodosService } from './todo.service';
import { UpdateTodoTitleDto } from './dto/update-todo-title.dto';

@Controller('todo')
@UseGuards(AuthGuard())
export class TodoController {
  constructor(private todosService: TodosService) {}

  @Get()
  getTodo(@GetUser() user: User): Promise<Todo[]> {
    return this.todosService.getTodo(user);
  }

  @Get('/:id')
  getTodoById(@Param('id') id: number, @GetUser() user: User): Promise<Todo> {
    return this.todosService.getTodoById(id, user);
  }

  @Post()
  createTodo(
    @Body(ValidationPipe) createTodoDto: CreateTodoDto,
    @GetUser() user: User,
  ): Promise<Todo> {
    return this.todosService.createTodo(createTodoDto, user);
  }

  @Delete('/:id')
  deleteTodo(@Param('id') id: number, @GetUser() user: User): Promise<void> {
    return this.todosService.deleteTodo(id, user);
  }

  @Patch('/:id/status')
  updateTodoStatus(
    @Param('id') id: number,
    @Body(ValidationPipe) updateTodoStatusDto: UpdateTodoStatusDto,
    @GetUser() user: User,
  ): Promise<Todo> {
    return this.todosService.updateTodoStatus(id, updateTodoStatusDto, user);
  }

  @Patch('/:id/title')
  updateTodoTitle(
    @Param('id') id: number,
    @Body(ValidationPipe) updateTodoTitleDto: UpdateTodoTitleDto,
    @GetUser() user: User,
  ): Promise<Todo> {
    return this.todosService.updateTodoTitle(id, updateTodoTitleDto, user);
  }
}
