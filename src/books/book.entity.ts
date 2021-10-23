import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
