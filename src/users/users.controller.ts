import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/register')
  async register(@Body() body: UserDto) {
    return await this.userService.register(body);
  }

  @Post('/token')
  async token() {
    return await this.userService.token();
  }
}
