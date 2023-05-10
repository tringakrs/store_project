import { IsNumber, IsOptional } from "class-validator";

export class UpdatePostDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsOptional()
  content: string;

  @IsOptional()
  title: string;
}
