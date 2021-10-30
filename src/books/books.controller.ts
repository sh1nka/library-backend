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
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBooksFilterDto } from './dto/get-book-filter.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
@UseGuards(AuthGuard())
export class BooksController {
  private logger = new Logger('BooksController');

  constructor(private booksService: BooksService) {}

  @Post()
  createBook(
    @Body() createBookDto: CreateBookDto,
    @GetUser() user: User,
  ): Promise<Book> {
    this.logger.verbose(
      `"User ${user.username}" creating a book. Data: ${JSON.stringify(
        createBookDto,
      )}`,
    );
    return this.booksService.createBook(createBookDto);
  }

  @Get()
  getBooks(
    @Query() filterDto: GetBooksFilterDto,
    @GetUser() user: User,
  ): Promise<Book[]> {
    this.logger.verbose(`"User ${user.username}" retrieving all tasks`);
    return this.booksService.getBooks(filterDto);
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
}
