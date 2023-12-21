import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { User } from 'src/users/user.entity';
import { DepositDto, RollbackDto } from './transaction.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private transRepo: Repository<Transaction>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async deposit(body: DepositDto) {
    // Fetch user
    const user = await this.userRepo.findOne({
      where: { username: body.username },
    });

    const deposit_id = uuidv4();
    try {
      // Add amount to users balance
      user.balance += body.amount;
      await this.userRepo.save(user);

      // Create a transaction
      const transaction = new Transaction();
      transaction.amount = body.amount;
      transaction.deposit_id = deposit_id;
      transaction.username = body.username;
      await this.transRepo.save(transaction);
    } catch (error) {
      throw new HttpException('Not succeded. Unknown error.', 500);
    }

    return {
      status: 201,
      message: 'Successful',
      balance: user.balance,
      deposit_id,
    };
  }

  async rollback(body: RollbackDto) {
    // Fetch transaction and user
    const transaction = await this.transRepo.findOne({
      where: { deposit_id: body.deposit_id },
    });
    const user = await this.userRepo.findOne({
      where: { username: transaction.username },
    });

    try {
      // Remove transaction amount from users balance
      user.balance -= transaction.amount;
      await this.userRepo.save(user);
    } catch (err) {
      throw new HttpException('Not succeded. Unknown error.', 500);
    }

    return {
      status: 200,
      message: 'Successful',
      balance: user.balance,
    };
  }
}
