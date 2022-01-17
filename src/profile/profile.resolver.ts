import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { ProfileService } from './profile.service';
// import { CreateProfileInput } from './dto/create-profile.input';
// import { UpdateProfileInput } from './dto/update-profile.input';
import { User } from '../user/user.entity';
import { createWriteStream } from 'fs';
import { CurrentUser } from '../auth/auth.user';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/auth.guard';

@Resolver(() => User)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async uploadFileProfile(
    @CurrentUser() user: User,
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./uploads/${filename}`))
        .on('finish', async () => {
          resolve(true);
        })
        .on('error', () => reject(false)),
    );
  }

  // @Mutation(() => User)
  // createProfile(
  //   @Args('createProfileInput') createProfileInput: CreateProfileInput,
  // ) {
  //   return this.profileService.create(createProfileInput);
  // }

  // @Mutation(() => User)
  // updateProfile(
  //   @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  // ) {
  //   return this.profileService.update(
  //     updateProfileInput.id,
  //     updateProfileInput,
  //   );
  // }

  // @Mutation(() => User)
  // removeProfile(@Args('id', { type: () => Int }) id: number) {
  //   return this.profileService.remove(id);
  // }
}
