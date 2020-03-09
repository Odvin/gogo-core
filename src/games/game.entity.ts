import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { GameStatus } from "./game-status.enum";

import { GameToUser } from './game-to-user.entity';

@Entity()
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'enum', enum: GameStatus, default: GameStatus.open })
  status: GameStatus;

  @OneToMany(type => GameToUser, gameToUser => gameToUser.game)
  public gamesToUsers!: GameToUser[];
}