import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  create(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<User> {
    // TODO: dto validation, do not accept any other keys
    return this.authService.signUp(createUserDto);
  }

  @Post('/login')
  async login(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(authCredentialsDto);
  }
}
