import { EntityRepository, Repository } from "typeorm";
import { Logger, InternalServerErrorException } from "@nestjs/common";
import { Game } from './game.entity';
import { CreateGameDto } from "./dto/create-game.dto";
import { GameStatus } from "./game-status.enum";
import { GetGameFilterDto } from './dto/get-game-filter.dto';

@EntityRepository(Game)
export class GameRepository extends Repository<Game> {
  private logger = new Logger('Game Repository');

  async getGames(
    filterDto: GetGameFilterDto,
  ): Promise<Game[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('game');

    if (status) {
      query.andWhere('game.status =:status', { status });
    }

    if (search) {
      query.andWhere('(game.title LIKE :search OR game.description LIKE :search)', { search: `%${search}%` });
    }

    try {
      const games = await query.getMany();

      return games;

    } catch (error) {
      this.logger.error(`Failed to get games. fitterDto: ${JSON.stringify(filterDto)}`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async createNewGame(createGameDto: CreateGameDto): Promise<Game> {
    this.logger.verbose(`New game has to be added to the Game entity`);

    const { title, description } = createGameDto;

    const game = new Game();
    game.title = title;
    game.description = description;
    game.status = GameStatus.hidden;
    await game.save();

    return game;
  }

}