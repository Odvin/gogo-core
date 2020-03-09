import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtToken } from './interfaces/jwt-token.interface';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) { }

  async createPasswordHash(authCredentialsDto: AuthCredentialsDto): Promise<AuthCredentialsDto> {
    const SALT_ROUNDS = 10;

    const { password: plainPassword } = authCredentialsDto;

    const hashedPassword = await bcrypt.hash(plainPassword, SALT_ROUNDS);

    authCredentialsDto.password = hashedPassword; 

    return authCredentialsDto;
  }

  async validatePassword(authCredentialsDto: AuthCredentialsDto, hashedPassword: string): Promise<boolean> {
    const { password: plainPassword } = authCredentialsDto;

    return bcrypt.compare(plainPassword, hashedPassword)
  }

  async signUserToken(user: User): Promise<JwtToken> {
    const payload: JwtPayload = {
      id: user.id,
    };

    const bearerToken = await this.jwtService.sign(payload);

    return { bearerToken }
  }
}
