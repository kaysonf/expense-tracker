import {
  Body,
  Controller, Get,
  Post,
  UseGuards,
  ValidationPipe
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/auth-user.decorator';
import { User } from '../users/entities/user.entity';
import { CreateWalletDto } from './dto/create-wallet.dto';

@Controller('wallet')
@UseGuards(AuthGuard())
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  async createWallet(
    @GetUser() user: User,
    @Body(ValidationPipe) createWalletDto: CreateWalletDto,
  ) {
    return await this.walletService.createWallet(user, createWalletDto);
  }

  @Get()
  async getWallets(@GetUser() user: User) {
    return this.walletService.getWalletsForUser(user);
  }
}
