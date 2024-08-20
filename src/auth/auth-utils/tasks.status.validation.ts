import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from 'src/tasks/entities/task.entity';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any) {
    value.status = value.status.toUpperCase();

    if (!this.isStatusValid(value.status)) {
      throw new BadRequestException(`"${value.status}" is an invalid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    return this.allowedStatuses.includes(status);
  }
}
