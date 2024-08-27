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
import { BookUrlValidatorPipe } from './pipe/book.url.validator.pipe';

@UseInterceptors(LoggingInterceptor)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  public create(@Body() body: IBook): Promise<BookDocument> {
    return this.booksService.create(body);
  }

  @Get()
  public getAll(): Promise<BookDocument[]> {
    return this.booksService.getAll();
  }

  @Get(':id')
  public getBook(@Param('id', BookUrlValidatorPipe) id: string) {
    return this.booksService.getBook(id);
  }

  @Put(':id')
  public updateBook(
    @Param('id', BookUrlValidatorPipe) id: string,
    @Body() updatedBook: IBook,
  ) {
    return this.booksService.updateBook(id, updatedBook);
  }

  @Delete(':id')
  public deleteBook(@Param('id', BookUrlValidatorPipe) id: string) {
    return this.booksService.deleteBook(id);
  }
}
