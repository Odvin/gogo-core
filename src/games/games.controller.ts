import { Controller, UseGuards, Logger, Post, Body, Get, Query, ValidationPipe, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './game.entity';
import { GetGameFilterDto } from './dto/get-game-filter.dto';
import { GameStatusValidationPipe } from './pipes/game-status-validation.pipe';
import { GameStatus } from './game-status.enum';
import { GetUser } from '../users/get-user.decorator';
import { User } from '../users/user.entity';


@Controller('games')
@UseGuards(AuthGuard())
export class GamesController {
  private logger = new Logger('Games controller');

  constructor(private gameService: GameService) { };

  @Post()
  createGame(@Body() createGameDto: CreateGameDto): Promise<Game> {
    this.logger.verbose('A new game has to be created');

    return this.gameService.createGame(createGameDto);
  }

  @Get()
  getGames(
    @Query(ValidationPipe) filterDto: GetGameFilterDto
  ): Promise<Game[]> {
    return this.gameService.getGames(filterDto);
  }

  @Patch('/:id/status')
  updateGameStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', GameStatusValidationPipe) status: GameStatus,
  ): Promise<Game> {
    return this.gameService.updateGameStatus(id, status);
  }

  @Post('/users')
  async userPlayGame(
    @Body('gameId', ParseIntPipe) gameId: number,
    @GetUser() user: User
  ): Promise <void> {
    this.logger.verbose(`User ${user.email} stars play the game with Id: ${gameId}`);
    
    return this.gameService.userPlayGame(user, gameId);
  }
}
