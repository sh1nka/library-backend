import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBooksFilterDto } from './dto/get-book-filter.dto';

@EntityRepository(Book)
export class BooksRepository extends Repository<Book> {
  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const { title, author, country, publishing_company, edition } =
      createBookDto;

    const book = this.create({
      title,
      author,
      country,
      publishing_company,
      edition,
    });

    await this.save(book);

    return book;
  }

  async getTasks(filterDto: GetBooksFilterDto): Promise<Book[]> {
    const { search, title, author, country, publishing_company } = filterDto;
    const query = this.createQueryBuilder('book');

    if (title) {
      query.andWhere('book.title = :title', { title });
    }

    const books = await query.getMany();

    return books;
  }
}
