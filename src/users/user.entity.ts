import { Education } from './education.enum';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  public id: number;

  @Column({ unique: true, nullable: false })
  public email: string;

  @Column({ nullable: false })
  public firstName: string;

  @Column({ nullable: false })
  public lastName: string;

  @Column({ type: 'enum', enum: Education, nullable: true })
  public education: Education;
}