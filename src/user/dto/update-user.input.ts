import { InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsOptional()
  @IsString()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'O e-mail é inválido' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio' })
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'A senha não pode estar vazio.' })
  password?: string;
}
