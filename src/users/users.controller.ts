import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
