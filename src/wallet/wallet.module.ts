import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [AuthModule, UsersModule], // imported so we can use auth guard
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
