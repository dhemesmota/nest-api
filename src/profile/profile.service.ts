import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { UploadFileInput } from './dto/upload-file.input';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async update(id: number, uploadFileInput: UploadFileInput): Promise<void> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    await this.userRepository.update(user, { image: uploadFileInput.filename });

    const userUpdated = this.userRepository.create({
      ...user,
      image: uploadFileInput.filename,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
