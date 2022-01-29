import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity({ name: "posts" })
export class Post extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false,  type: 'text' })
  content: string;

  @CreateDateColumn({ nullable: false })
  createdAt: string;

  @Column("boolean", { default: true })
  isActive: boolean;

  @ManyToOne(() => User)
  @JoinColumn({name: 'user_id'})
  user: User;
}
