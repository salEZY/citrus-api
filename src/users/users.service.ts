import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './users.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwt: JwtService,
  ) {}

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
    try {
      await this.userRepo.save(user);
    } catch (err) {
      console.log(err);
      throw new HttpException('Not succeded. Unknown error.', 500);
    }

    return {
      status: 201,
      message: 'Successful',
    };
  }

  async token(body: UserDto) {
    // Check if exist
    let user = await this.userRepo.findOne({
      where: { username: body.username },
    });
    if (!user) throw new HttpException('Not succeded. User not found.', 404);

    // Compare passwords
    const matchPasswords = await bcrypt.compare(body.password, user.password);
    if (!matchPasswords)
      throw new HttpException(
        'Not succeded. Invalid username or password ',
        403,
      );

    // Generate token
    let token: string;
    try {
      token = this.jwt.sign(
        { id: user.id },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '1h',
        },
      );
    } catch (err) {
      console.log(err);
      throw new HttpException('Not succeded. Unknown error.', 500);
    }

    return {
      status: 201,
      message: 'Successful',
      token,
    };
  }
}
