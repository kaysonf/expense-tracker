import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryFailedError } from 'typeorm';
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
      if (error instanceof QueryFailedError)
        throw new InternalServerErrorException(`this handle cannot be used`);
      else throw new InternalServerErrorException('an unknown error occurred');
    }
  }

  async updateUser(
    handle: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.getUserByHandle(handle);

    const { name, email } = updateUserDto;

    user.name = name;
    user.email = email;

    await user.save();
    return user;
  }
}
