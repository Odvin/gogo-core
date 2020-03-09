import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GameRepository } from './game.repository';
import { CreateGameDto } from "./dto/create-game.dto";
import { Game } from './game.entity';
import { GetGameFilterDto } from "./dto/get-game-filter.dto";
import { GameStatus } from "./game-status.enum";
import { GameToUserRepository } from './game-to-user.repository';
import { User } from '../users/user.entity';

@Injectable()
export class GameService {

  constructor(
    @InjectRepository(GameRepository)
    private gameRepository: GameRepository,

    @InjectRepository(GameToUserRepository)
    private GameToUserRepository: GameToUserRepository,

  ) { }

  private logger = new Logger('Game Service');

  async createGame(createGameDto: CreateGameDto): Promise<Game> {
    return this.gameRepository.createNewGame(createGameDto);
  }

  async getGames(filterDto: GetGameFilterDto): Promise<Game[]> {
    return this.gameRepository.getGames(filterDto);
  }

  async getGameById(id: number): Promise<Game> {
    const game = await this.gameRepository.findOne(
      { where: { id } }
    );

    if (!game) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }

    return game;
  }

  async updateGameStatus(id: number, status: GameStatus): Promise<Game> {
    this.logger.verbose(`Game with id: ${id} has to change their status to ${status}`)

    const game = await this.getGameById(id);
    game.status = status;
    await game.save();

    return game;
  }

  async userPlayGame(user: User, gameId: number): Promise<void> {
    const game: Game = await this.getGameById(gameId);
    
    return this.GameToUserRepository.userPlayGame(user, game);
  }
}