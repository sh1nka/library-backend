import { IsNotEmpty } from 'class-validator';
export class CreateBookDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  publishing_company: string;

  @IsNotEmpty()
  edition: string;
}
