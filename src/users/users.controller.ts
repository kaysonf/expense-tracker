import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':handle')
  findOne(@Param('handle') handle: string): Promise<User> {
    return this.usersService.getUserByHandle(handle);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':handle')
  update(
    @Param('handle') handle: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(handle, updateUserDto);
  }
}
