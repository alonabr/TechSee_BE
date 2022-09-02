import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {

  @IsString()
  public body!: string
}