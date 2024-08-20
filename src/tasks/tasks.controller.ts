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
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';
import { UpdateTaskTitleDto } from './dto/update-task-title';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@GetUser() user: User): Promise<Task[]> {
    return this.tasksService.getTasks(user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: number, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  createTask(
    @Body(ValidationPipe) createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: number, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: number,
    // @Body(TaskStatusValidationPipe) updateTaskStatusDto: UpdateTaskStatusDto,
    @Body(ValidationPipe) updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, updateTaskStatusDto, user);
  }
  
  @Patch('/:id/title')
  updateTodoTitle(
    @Param('id') id: number,
    // @Body(TaskStatusValidationPipe) updateTaskStatusDto: UpdateTaskStatusDto,
    @Body(ValidationPipe) updateTaskTitleDto: UpdateTaskTitleDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTaskTitle(id, updateTaskTitleDto, user);
  }
}
