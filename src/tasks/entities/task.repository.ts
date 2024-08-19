import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  @InjectRepository(Task) private taskRepository: Repository<Task>;

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, completed } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.completed = completed;
    task.user = user;
    await this.taskRepository.save(task);

    return task;
  }

  async deleteTask(id: number, user: User): Promise<any> {
    const result = await this.taskRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return result;
  }
}
