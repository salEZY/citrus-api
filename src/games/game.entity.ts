import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'games' })
export class Game {
  @PrimaryColumn()
  game_id: string;

  @Column()
  creator: string;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  price: number;
}
