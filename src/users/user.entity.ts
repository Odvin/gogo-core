import { Gender } from './gender.enum';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  public id: number;

  @Column({ unique: true, nullable: false })
  public email: string;
  
  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  salt: string;

  @Column({ nullable: true })
  public username: string;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  public gender: Gender;
}