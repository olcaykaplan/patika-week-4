import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Post } from "./post.entity";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @CreateDateColumn()
  registeredAt: string;

  // if the user deleted, relational posts will be deleted 
  @OneToMany(() => Post, post => post.user, {onDelete: 'CASCADE'})
  posts: Array<Post>;
}
