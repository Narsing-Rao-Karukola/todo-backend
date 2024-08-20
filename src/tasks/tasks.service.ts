import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskService } from './entities/task.repository';
import { UpdateTaskTitleDto } from './dto/update-task-title';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private taskHelperService: TaskService,
  ) {}

  async getTasks(user: User): Promise<Task[]> {
    const query = this.taskRepository.createQueryBuilder('task');
    query.where('task.userId = :userId', { userId: user.id });

    const tasks = await query.getMany();
    return tasks;
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskHelperService.createTask(createTaskDto, user);
  }

  async deleteTask(id: number, user: User): Promise<void> {
    const result = await this.taskHelperService.deleteTask(id, user);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTaskStatus(
    id: number,
    updateTaskStatusDto: UpdateTaskStatusDto,
    user: User,
  ): Promise<Task> {
    const { completed, title } = updateTaskStatusDto;
    const task = await this.getTaskById(id, user);
    task.completed = completed;
    task.title = title;
    await this.taskRepository.update({ id }, task);
    return task;
  }

  async updateTaskTitle(
    id: number,
    updateTaskTitleDto: UpdateTaskTitleDto,
    user: User,
  ): Promise<Task> {
    const { title } = updateTaskTitleDto;
    const task = await this.getTaskById(id, user);
    task.title = title;
    await this.taskRepository.update({ id }, task);
    return task;
  }
}
