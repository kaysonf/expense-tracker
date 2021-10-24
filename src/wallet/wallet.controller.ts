import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/auth-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  @UseGuards(AuthGuard())
  async viewWallet(@GetUser() user: User) {
    console.log(user);
  }
}
