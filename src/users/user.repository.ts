import { EntityRepository, Repository } from "typeorm";
import { User } from './user.entity';
import { Logger } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { Education } from "./education.enum";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger('UserRepository')

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const {
      email,
      firstName,
      lastName,
      education
    } = createUserDto;

    const user = new User();
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.education = Education[education];

    await user.save()

    return user;
  }
}