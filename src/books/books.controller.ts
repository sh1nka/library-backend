import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Book } from './book.model';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getAllBooks(): Book[] {
    return this.booksService.getAllBooks();
  }

  @Get('/:id')
  getBookById(@Param('id') id: string): Book {
    return this.booksService.getBookById(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.booksService.deleteTask(id);
  }

  @Post()
  createBook(@Body() createBookDto: CreateBookDto): Book {
    return this.booksService.createBook(createBookDto);
  }
}
