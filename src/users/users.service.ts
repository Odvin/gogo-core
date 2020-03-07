import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { User } from './user.entity';
import { AuthCredentialsDto } from "src/users/dto/auth-credentials.dto";
import { userInfo } from "os";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository
  ) { }
  
  async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentials);
  }

  async findUserByEmail(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.userRepository.findUserByEmail(authCredentialsDto);
  }
    
  async updateUserInfo(user: User, userIfo: User): Promise<User> {
    return this.userRepository.updateUserInfo(user, userIfo);
  }
}