import { Controller, Post, Patch, Body, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { DepositDto, RollbackDto } from './transaction.dto';
import { AuthGuard } from 'src/users/auth.guard';

@UseGuards(AuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @Post('/deposit')
  async deposit(@Body() depositDto: DepositDto) {
    return await this.transactionService.deposit(depositDto);
  }

  @Patch('/rollback')
  async rollback(@Body() rollbackDto: RollbackDto) {
    return await this.transactionService.rollback(rollbackDto);
  }
}
