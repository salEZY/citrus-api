import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { GamesModule } from './games/games.module';
import { DbModule } from './db.module';

@Module({
  imports: [UsersModule, TransactionsModule, GamesModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
