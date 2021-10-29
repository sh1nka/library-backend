import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;
}
