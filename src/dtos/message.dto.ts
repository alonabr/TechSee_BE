import { IsString, IsEmail, IsDate, IsDateString } from 'class-validator';

export class CreateMessageDto {

  constructor(data: any) {
    this.message = data.message;
    this.username = data.username;
    this.date = data.date;
    this.userId = data.socketId;
  }

  @IsString()
  message!: string;
  
  @IsString()
  username!: string

  @IsDateString()
  date!: String;

  @IsString()
  userId?: String;
}