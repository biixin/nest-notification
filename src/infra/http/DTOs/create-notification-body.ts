import { IsEmail, IsNotEmpty, IsUUID, Length } from 'class-validator'

export class CreateNotificationBody {
  @IsNotEmpty()
  //@IsUUID()
  recipientId: string;

  @IsNotEmpty()
  @Length(5, 258)
  content: string;

  @IsNotEmpty()
  category: string;
}