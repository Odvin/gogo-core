import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Game } from './game.entity';
import { User } from "src/users/user.entity";


@Entity()
export class GameToUser {
    @PrimaryGeneratedColumn({ unsigned: true })
    public id!: number;

    @Column({ unsigned: true })
    public userId!: number;

    @Column({ unsigned: true })
    public gameId!: number;

    @Column({ nullable: false })
    public started: Date;

    @Column({ nullable: true, default: null })
    public finished: Date;

    @ManyToOne(type => Game, game => game.gamesToUsers)
    public game!: Game;

    @ManyToOne(type => User, user => user.gamesToUsers)
    public user!: User;
}