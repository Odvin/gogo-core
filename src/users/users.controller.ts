import { Controller, Logger, Post, Body, UnauthorizedException, Patch, ValidationPipe, UseGuards, ParseIntPipe } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './users.service';
import { AuthCredentialsDto } from 'src/users/dto/auth-credentials.dto';
import { AuthService } from 'src/users/auth.service';
import { JwtToken } from './interfaces/jwt-token.interface';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { UserInfoDto } from './dto/user-info.dto';

@Controller('users')
export class UsersController {
  private logger = new Logger('UserController');

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) { };

  @Post('/signup')
  async createUser(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
    this.logger.verbose(`User ${authCredentialsDto.email} has to be created`);

    const authCredential = await this.authService.createPasswordHash(authCredentialsDto);
    return this.userService.signUp(authCredential);
  }

  @Post('/signin')
  async loginUser(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<JwtToken> {
    this.logger.verbose(`User ${authCredentialsDto.email} obtains jwt token`);

    const user: User = await this.userService.findUserByEmail(authCredentialsDto);

    if (!user) {
      throw new UnauthorizedException('User was not found');
    }

    const isPasswordValid: boolean = await this.authService.validatePassword(authCredentialsDto, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.signUserToken(user);
  }

  @Patch('/info')
  @UseGuards(AuthGuard())
  async updateUserInfo(
    @Body(ValidationPipe) userInfo: UserInfoDto,
    @GetUser() user: User
  ): Promise<User> {
    this.logger.verbose(`User ${user.email} patch personal info`);

    return this.userService.updateUserInfo(user, userInfo);
  }
}
