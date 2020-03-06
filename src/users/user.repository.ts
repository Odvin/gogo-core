import { EntityRepository, Repository } from "typeorm";
import { User } from './user.entity';
import { Logger, ConflictException, InternalServerErrorException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { Gender } from "./gender.enum";
import { AuthCredentialsDto } from "src/auth/dto/auth-credentials.dto";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger('UserRepository')

  async singUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { email, password } = authCredentialsDto;

    const user = this.create()
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, user.salt);

    try {
      await user.save();
    } catch(error) {
      if (error.code = '23505') {
        throw new ConflictException('User email already exists');
      } else {
        throw new InternalServerErrorException()
      }
    }

  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const {
      email,
      username,
      gender
    } = createUserDto;

    const user = new User();
    user.email = email;
    user.username = username;
    user.gender = Gender[gender];

    await user.save()

    return user;
  }

}