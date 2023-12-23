import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './game.entity';
import { User } from '../users/user.entity';
import { generateId } from '../util/helpers';
import { BuyGameDto } from './game.dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private gameRepo: Repository<Game>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(body: any) {
    // Check if game and user exists
    let game = await this.gameRepo.findOne({ where: { name: body.name } });
    if (game)
      throw new HttpException(
        `Not succeded. Game with ${game.name} already exists.`,
        403,
      );
    const user = await this.userRepo.findOne({
      where: { username: body.username },
    });
    if (!user) throw new HttpException('Not succeded. No user.', 403);

    try {
      // Create new game
      game = new Game();
      game.game_id = generateId();
      game.creator = body.creator;
      game.name = body.name;
      game.title = body.title;
      game.price = body.price;
      await this.gameRepo.save(game);
    } catch (err) {
      throw new HttpException(`Not succeded. Unknown error`, 500);
    }

    return {
      status: 201,
      message: 'Successful',
      game_id: game.game_id,
    };
  }

  async buy(body: BuyGameDto) {
    // Check game and user exists
    const game = await this.gameRepo.findOne({
      where: { game_id: body.game_id },
    });
    if (!game) throw new HttpException(`Not succeded. Game doesnt exist.`, 404);
    const customer = await this.userRepo.findOne({
      where: { username: body.username },
    });
    if (!customer)
      throw new HttpException(`Not succeded. Customer doesnt exist.`, 404);

    if (customer.balance < game.price)
      throw new HttpException(`Not succeded. Not enough funds.`, 403);

    // Fetch game creator
    const creator = await this.userRepo.findOne({
      where: { username: game.creator },
    });

    try {
      // Customer add game, remove price of game from balance
      customer.games.push(game.game_id);
      customer.balance -= game.price;
      await this.userRepo.save(customer);

      // Add price of game to creator's balance
      creator.balance += game.price;
      await this.userRepo.save(creator);
    } catch (error) {
      throw new HttpException(`Not succeded. Unknown error`, 500);
    }

    return {
      status: 200,
      message: 'Successful',
      game_id: body.game_id,
      balance: customer.balance,
    };
  }
}
