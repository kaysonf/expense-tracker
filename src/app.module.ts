import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'tracker',
      autoLoadEntities: true, // nest picks up and loads all entities in repo
      synchronize: true, // keeps db schema in sync
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
