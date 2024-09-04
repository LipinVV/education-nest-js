import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BookCommentModel,
  BookCommentSchema,
} from '../schemas/book-comment.schema';
import { BookCommentsService } from './book-comments.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BookCommentModel.name, schema: BookCommentSchema },
    ]),
  ],
  providers: [BookCommentsService],
  exports: [BookCommentsService],
})
export class BookCommentsModule {}
