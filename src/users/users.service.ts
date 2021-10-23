import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository) // inject repository
    private usersRepository: UsersRepository,
  ) {}

  async getUserByHandle(handle: string): Promise<User> {
    const found = await this.usersRepository.findOne({ handle });

    if (!found) {
      throw new NotFoundException(`no user with the handle ${handle}`);
    }

    return found;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.usersRepository.createUser(createUserDto);
    } catch (error) {
      switch (error.code) {
        case '23505':
          throw new ConflictException(`this handle cannot be used`);

        default:
          throw new InternalServerErrorException('an unknown error occurred');
      }
    }
  }

  async updateUser(
    handle: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    // use validation pipes
    const user = await this.getUserByHandle(handle);

    for (const key in user) {
      // unsafe, use validation pipe
      if (key in updateUserDto) user[key] = updateUserDto[key];
    }

    await user.save();
    return user;
  }
}
