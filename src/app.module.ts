require('dotenv').config();
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { GamesModule } from './games/games.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Transaction } from './transactions/transaction.entity';
import { Game } from './games/game.entity';

@Module({
  imports: [
    UsersModule,
    TransactionsModule,
    GamesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USERPASS,
      password: process.env.PG_USERPASS,
      database: process.env.PG_DB,
      entities: [User, Transaction, Game],
      // Remove in prod
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
