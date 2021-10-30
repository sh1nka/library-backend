import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  country: string;

  @Column()
  publishing_company: string;

  @Column()
  edition: string;

  // @ManyToOne((_type) => User, (user) => user.books, { eager: false })
  // user: User;
}
