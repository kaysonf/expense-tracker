import { PickType } from '@nestjs/mapped-types';
import { Wallet } from '../entities/wallet.entity';

export class CreateWalletDto extends PickType(Wallet, ['name'] as const) {}
