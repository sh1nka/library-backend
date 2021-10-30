import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Book } from './book.entity';
import { BooksRepository } from './books.repository';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBooksFilterDto } from './dto/get-book-filter.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BooksRepository)
    private booksRepository: BooksRepository,
  ) {}

  createBook(createBookDto: CreateBookDto): Promise<Book> {
    return this.booksRepository.createBook(createBookDto);
  }

  getBooks(filterDto: GetBooksFilterDto): Promise<Book[]> {
    return this.booksRepository.getTasks(filterDto);
  }

  async getBookById(id: string): Promise<Book> {
    const found = await this.booksRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return found;
  }

  async deleteBook(id: string): Promise<void> {
    const result = await this.booksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  }

  async updateBook(id, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.getBookById(id);
    const { title, author, country, publishing_company, edition } =
      updateBookDto;

    book.title = title;
    book.author = author;
    book.country = country;
    book.publishing_company = publishing_company;
    book.edition = edition;

    await this.booksRepository.save(book);

    return book;
  }
}
