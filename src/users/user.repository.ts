import { EntityRepository, Repository } from "typeorm";
import { User } from './user.entity';
import { Logger, ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { Gender } from "./gender.enum";
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserInfoDto } from "./dto/user-info.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger('UserRepository')

  async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    const { email, password } = authCredentials;

    const user = this.create()
    user.email = email;
    user.password = password;

    try {
      await user.save();
      this.logger.verbose(`User ${user.email} has been created with id: ${user.id}`);
    } catch (error) {
      if (error.code = '23505') {
        throw new ConflictException('User email already exists');
      } else {
        throw new InternalServerErrorException()
      }
    }

  }

  async findUserByEmail(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.findOne({ email: authCredentialsDto.email });
  }

  async updateUserInfo(user: User, userInfo: UserInfoDto): Promise<User> {

    const query = this.createQueryBuilder().update('User');

    query.set(userInfo).where("id = :id", { id: user.id })

    await query.execute();

    const updatedUser = await this.findOne({ id: user.id });

    delete updatedUser.password;

    return updatedUser;
  }
}