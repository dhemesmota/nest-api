import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode estar vazio' })
  name: string;

  @IsEmail({}, { message: 'O e-mail é inválido' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  password: string;
}
