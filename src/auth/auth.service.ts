import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async singUp(authCredentials: AuthCredentialsDto): Promise<void> {
    return this.userRepository.singUp(authCredentials);
  }
}
