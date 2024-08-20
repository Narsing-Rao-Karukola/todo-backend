import { IsNotEmpty } from 'class-validator';

export class UpdateTodoTitleDto {
  @IsNotEmpty()
  title: string;
}
