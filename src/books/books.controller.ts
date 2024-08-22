import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { IBook } from '../inferfaces';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Post()
  create(@Body() book: IBook) {
    this.booksService.create(book);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatedBook: IBook) {
    return this.booksService.update(id, updatedBook);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
