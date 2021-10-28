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
      query.andWhere('LOWER(book.title) = LOWER(:title)', { title });
    }

    if (author) {
      query.andWhere('LOWER(book.author) = LOWER(:author)', { author });
    }

    if (country) {
      query.andWhere('LOWER(book.country) = LOWER(:country)', { country });
    }

    if (publishing_company) {
      query.andWhere(
        'LOWER(book.publishing_company) = LOWER(:publishing_company)',
        { publishing_company },
      );
    }

    const books = await query.getMany();

    return books;
  }
}
