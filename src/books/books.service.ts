import { Injectable, NotFoundException } from '@nestjs/common';
import { Book, BookDocument } from '../schemas/book.schema';
import { Connection, HydratedDocument, Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { IBook } from '../inferfaces';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private BookModel: Model<BookDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  public async create(data: IBook): Promise<BookDocument> {
    const newBook = await new this.BookModel(data);
    return newBook.save();
  }

  async getAll(): Promise<BookDocument[]> {
    const booksData = await this.BookModel.find();
    if (!booksData || [booksData].length === 0) {
      throw new NotFoundException('Books data is not found!');
    }
    return booksData;
  }

  async getBook(
    bookId: string,
  ): Promise<HydratedDocument<BookDocument, unknown>[]> {
    const existingBook = await this.BookModel.find({ id: bookId });
    if (!existingBook) {
      throw new NotFoundException(`Book #${bookId} is not found`);
    }
    return existingBook;
  }

  async updateBook(bookId: string, bookToUpdate: IBook): Promise<BookDocument> {
    const existingBook = await this.BookModel.findByIdAndUpdate(
      bookId,
      bookToUpdate,
      { new: true },
    );
    if (!existingBook) {
      throw new NotFoundException(`Book #${bookId} is not found`);
    }
    return existingBook;
  }

  async deleteBook(id: string) {
    const bookToDelete = await this.BookModel.findOneAndDelete({ id });
    if (!bookToDelete) {
      throw new NotFoundException(`Book #${id} is not found`);
    }
    return `Book #${id} was deleted`;
  }
}
