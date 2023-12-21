import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryColumn()
  deposit_id: string;

  @Column()
  username: string;

  @Column()
  amount: number;
}
