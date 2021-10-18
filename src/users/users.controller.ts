import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get(':handle')
  findOne(@Param('handle') handle: string) {
    return this.usersService.getUserByHandle(handle);
  }

  @Patch(':handle')
  update(
    @Param('handle') handle: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(handle, updateUserDto);
  }
}
