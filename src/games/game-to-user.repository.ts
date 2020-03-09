import { Logger } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { GameToUser } from './game-to-user.entity';
import { User } from '../users/user.entity';
import { Game } from './game.entity';

@EntityRepository(GameToUser)
export class GameToUserRepository extends Repository<GameToUser> {
  private logger = new Logger('GameToUser Repository');

  async userPlayGame(user: User, game: Game): Promise<void> {

    const gameToUser = new GameToUser();
    gameToUser.user = user;
    gameToUser.game = game;
    gameToUser.started = new Date();
    
    await this.save(gameToUser);

    this.logger.verbose(`User: ${user.email} stats to play ${game.title}`);
  }
}