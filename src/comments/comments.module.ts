import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BookCommentModel,
  BookCommentSchema,
} from '../schemas/book-comment.schema';
import { BookCommentsService } from '../book-comments/book-comments.service';
import { CommentsGateway } from '../gateways/comments.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BookCommentModel.name, schema: BookCommentSchema },
    ]),
  ],
  providers: [BookCommentsService, CommentsGateway],
  exports: [BookCommentsService],
})
export class CommentsModule {}
