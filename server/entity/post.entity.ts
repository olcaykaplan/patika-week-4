import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity({ name: "posts" })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  content: string;

  @CreateDateColumn({ nullable: false })
  createdAt: string;

  @Column("boolean", { default: true })
  isActive: boolean;

  @ManyToOne(() => User)
  @JoinColumn({name: 'user_id'})
  user: User;
}
