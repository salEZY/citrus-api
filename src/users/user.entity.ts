import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ type: 'char' })
  username: string;

  @Column({ type: 'char' })
  password: string;
}
