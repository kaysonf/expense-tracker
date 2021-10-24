import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  async login(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.validateUser(authCredentialsDto);

    const payload = { user };

    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }

  private async validateUser(authCredentialsDto: AuthCredentialsDto) {
    let user;

    try {
      user = await this.usersService.getUserByHandle(authCredentialsDto.handle);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new UnauthorizedException('Invalid Credentials');
      }
    }

    if (!user || user.password !== authCredentialsDto.password)
      throw new UnauthorizedException('Invalid Credentials');

    return user; // return only non confidential data, currently returning password
  }
}
