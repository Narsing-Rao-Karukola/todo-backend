import { IsNotEmpty } from 'class-validator';

export class UpdateTodoStatusDto {
  @IsNotEmpty()
  completed: boolean;
}
