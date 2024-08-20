import { IsNotEmpty } from 'class-validator';

export class UpdateTaskTitleDto {
  @IsNotEmpty()
  title: string;
}
