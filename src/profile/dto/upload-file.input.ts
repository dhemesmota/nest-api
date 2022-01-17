import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class UploadFileInput {
  @Field(() => Int, { description: 'Nome do arquivo' })
  filename: string;
}
