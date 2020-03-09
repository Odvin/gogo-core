import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameService } from './game.service';
import { UsersModule } from 'src/users/users.module';
import { GameRepository } from './game.repository';
import { GameToUserRepository } from './game-to-user.repository';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([GameRepository, GameToUserRepository])],
  controllers: [GamesController],
  providers: [GameService]
})
export class GamesModule {}
