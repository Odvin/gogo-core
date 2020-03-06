import { Controller, Logger, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
  private logger = new Logger('UserController');

  constructor(private userService: UserService) {};

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    this.logger.verbose(`User ${createUserDto.firstName} :: ${createUserDto.firstName} has to be created`);
    return this.userService.createUser(createUserDto);
  }
}
