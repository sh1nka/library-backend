import { Injectable } from '@nestjs/common';
import { Book } from './book.model';
import { v4 as uuid } from 'uuid';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  private books: Book[] = [];

  getAllBooks(): Book[] {
    return this.books;
  }

  getBookById(id: string): Book {
    return this.books.find((book) => book.id === id);
  }

  createBook(createBookDto: CreateBookDto): Book {
    const { title, author, country, publishing_company, edition } =
      createBookDto;
    const book: Book = {
      id: uuid(),
      title,
      author,
      country,
      publishing_company,
      edition,
    };

    this.books.push(book);
    return book;
  }

  deleteTask(id: string): void {
    this.books = this.books.filter((book) => book.id !== id);
  }
}
