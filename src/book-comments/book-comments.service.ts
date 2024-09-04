import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  BookCommentModel,
  BookCommentDocument,
} from '../schemas/book-comment.schema';

@Injectable()
export class BookCommentsService {
  constructor(
    @InjectModel(BookCommentModel.name)
    private bookCommentModel: Model<BookCommentDocument>,
  ) {}

  async create(
    createCommentDto: Partial<BookCommentModel>,
  ): Promise<BookCommentDocument> {
    const newComment = new this.bookCommentModel(createCommentDto);
    return newComment.save();
  }

  async findAll(): Promise<BookCommentDocument[]> {
    return this.bookCommentModel.find().exec();
  }

  async findOne(id: number): Promise<BookCommentDocument> {
    return this.bookCommentModel.findOne({ id }).exec();
  }

  async update(
    id: number,
    updateCommentDto: Partial<BookCommentModel>,
  ): Promise<BookCommentDocument> {
    return this.bookCommentModel
      .findOneAndUpdate({ id }, updateCommentDto, { new: true })
      .exec();
  }

  async remove(id: number): Promise<BookCommentDocument> {
    return this.bookCommentModel.findOneAndDelete({ id }).exec();
  }

  async findAllBookComment(bookId: number): Promise<BookCommentDocument[]> {
    return this.bookCommentModel.find({ bookId }).exec();
  }
}
