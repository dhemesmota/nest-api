import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  @IsOptional()
  name?: string;

  @IsEmail({}, { message: 'O e-mail é inválido' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio' })
  @IsOptional()
  email?: string;
}
