import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { handle, name, email } = createUserDto;
    const user = new User();
    user.handle = handle;
    user.name = name;
    user.email = email;

    await user.save();
    return user;
  }
}
