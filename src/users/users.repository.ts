import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Logger } from '@nestjs/common';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  private readonly logger = new Logger(UsersRepository.name);

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();

    for (const key in createUserDto) {
      user[key] = createUserDto[key];
    }

    await user.save();
    return user;
  }
}
