import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletRepository } from './walletRepository';

@Module({
  imports: [
    AuthModule, // imported so we can use auth guard
    UsersModule,
    TypeOrmModule.forFeature([WalletRepository]),
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
