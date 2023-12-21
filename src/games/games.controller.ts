import { Controller, Post, UseGuards, Body, Req } from '@nestjs/common';
import { AuthGuard } from 'src/users/auth.guard';
import { GamesService } from './games.service';
import { BuyGameDto, CreateGameDto } from './game.dto';

@UseGuards(AuthGuard)
@Controller('games')
export class GamesController {
  constructor(private readonly gameService: GamesService) {}

  @Post('/create')
  async create(@Body() body: CreateGameDto, @Req() req: any) {
    // Get game creator
    const creator = req.user.username;
    const data = { creator, ...body };

    return await this.gameService.create(data);
  }

  @Post('/buy')
  async buy(@Body() body: BuyGameDto) {
    return await this.gameService.buy(body);
  }
}
