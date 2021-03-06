import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProfileInput {
  @Field(() => Int, { description: 'Nome do arquivo' })
  filename: string;
}
