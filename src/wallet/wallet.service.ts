import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletRepository } from './walletRepository';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { User } from '../users/entities/user.entity';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletRepository)
    private walletRepository: WalletRepository,
  ) {}

  async createWallet(
    user: User,
    createWalletDto: CreateWalletDto,
  ): Promise<Wallet> {
    return await this.walletRepository.createWallet(user, createWalletDto);
  }

  async getWalletsForUser(user: User): Promise<Wallet[]> {
    return await this.walletRepository.getWalletsForUser(user);
  }
}
