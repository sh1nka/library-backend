import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBooksFilterDto } from './dto/get-book-filter.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
@UseGuards(AuthGuard())
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post()
  createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.createBook(createBookDto);
  }

  @Get('/:id')
  getBookById(@Param('id') id: string): Promise<Book> {
    return this.booksService.getBookById(id);
  }

  @Delete('/:id')
  deleteBook(@Param('id') id: string): Promise<void> {
    return this.booksService.deleteBook(id);
  }

  @Put('/:id')
  updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.updateBook(id, updateBookDto);
  }

  @Get()
  getBooks(@Query() filterDto: GetBooksFilterDto): Promise<Book[]> {
    return this.booksService.getBooks(filterDto);
  }
}
