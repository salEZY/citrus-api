import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserDto } from './users.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async registration(body: UserDto) {
    // Check if exist
    let user = await this.userRepo.findOne({
      where: { username: body.username },
    });
    if (user)
      throw new HttpException('Not succeded. User already created.', 403);

    // Salt and hash
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(body.password, salt);

    user = new User();
    user.username = body.username;
    user.password = hash;
    await this.userRepo.save(user);

    return 'Successful';
  }

  async token() {}
}
