import { PickType } from '@nestjs/mapped-types';
import { User } from '../../users/entities/user.entity';

export class AuthCredentialsDto extends PickType(User, [
  'handle',
  'password',
] as const) {}
