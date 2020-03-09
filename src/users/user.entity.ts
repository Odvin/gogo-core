import { Gender } from './gender.enum';
import { GameToUser } from '../games/game-to-user.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  public id: number;

  @Column({ unique: true, nullable: false })
  public email: string;
  
  @Column({ nullable: false })
  public password: string;

  @Column({ nullable: true, default: 'Anonymous' })
  public username: string;

  @Column({ type: 'enum', enum: Gender, default: Gender.male })
  public gender: Gender;

  @OneToMany(type => GameToUser, gameToUser => gameToUser.user)
  public gamesToUsers!: GameToUser[];
}