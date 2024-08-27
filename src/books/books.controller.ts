import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDocument } from '../schemas/book.schema';
import { LoggingInterceptor } from './interceptor/book.logging.interceptor';
import { IBook } from '../inferfaces';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  public create(@Body() body: IBook): Promise<BookDocument> {
    return this.booksService.create(body);
  }

  @UseInterceptors(LoggingInterceptor)
  @Get()
  public getAll(): Promise<BookDocument[]> {
    return this.booksService.getAll();
  }

  @Get(':id')
  public getBook(@Param('id') id: string) {
    return this.booksService.getBook(id);
  }

  @Put(':id')
  public updateBook(@Param('id') id: string, @Body() updatedBook: IBook) {
    return this.booksService.updateBook(id, updatedBook);
  }

  @Delete(':id')
  public deleteBook(@Param('id') id: string) {
    return this.booksService.deleteBook(id);
  }
}
