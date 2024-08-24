import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDocument } from '../schemas/book.schema';
import { IBook } from '../inferfaces';

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
  public getBook(@Param('id') id: string) {
    console.log(id);
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
