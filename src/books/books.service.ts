import { Injectable } from '@nestjs/common';
import { Books } from '../mockData/books';
import { IBook } from '../inferfaces';

@Injectable()
export class BooksService {
  private books = Books;

  findAll() {
    return this.books;
  }

  findOne(id: string) {
    const foundBook = this.books.find((book: IBook) => book.id === id);
    return foundBook ? foundBook : 'book was not found';
  }

  create(book) {
    this.books.push(book);
  }

  update(id: string, updatedBook: IBook) {
    const bookIndex = this.books.findIndex((book: IBook) => book.id === id);
    if (bookIndex > -1) {
      this.books[bookIndex] = updatedBook;
    }
  }

  remove(id: string) {
    this.books = this.books.filter((book: IBook) => book.id !== id);
  }
}
