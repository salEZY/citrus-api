import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  balance: number;
}
