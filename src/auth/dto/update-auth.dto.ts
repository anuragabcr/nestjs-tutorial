import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import {
  IsString,
  IsOptional,
  IsEmail,
  IsJSON,
  Matches,
  IsNotEmpty,
} from 'class-validator';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
    {
      message:
        'Password must be at least 8 characters long, contain both letters, numbers, and special characters.',
    },
  )
  password?: string;

  @IsOptional()
  @IsString()
  application?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsJSON()
  additionalData?: any;
}
