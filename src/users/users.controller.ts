import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/registration')
  async registration(@Body() createUserDto: UserDto) {
    return await this.userService.registration(createUserDto);
  }

  @Post('/token')
  async token() {
    return await this.userService.token();
  }
}
