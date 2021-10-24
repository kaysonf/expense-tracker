import { EntityRepository, Repository } from 'typeorm';
import { Wallet } from './entities/wallet.entity';
import { BadRequestException, Logger } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { User } from '../users/entities/user.entity';

@EntityRepository(Wallet)
export class WalletRepository extends Repository<Wallet> {
  private readonly logger = new Logger(WalletRepository.name);

  async createWallet(
    user: User,
    createWalletDto: CreateWalletDto,
  ): Promise<Wallet> {
    if (!user) throw new BadRequestException();

    const wallet = new Wallet();
    wallet.user = user;
    for (const key in createWalletDto) {
      wallet[key] = createWalletDto[key];
    }

    await wallet.save();
    return wallet;
  }

  async getWalletsForUser(user: User): Promise<Wallet[]> {
    return await this.find({
      where: {
        user,
      },
    });
  }
}
