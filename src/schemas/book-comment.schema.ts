import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookCommentDocument = BookCommentModel & Document;

@Schema()
export class BookCommentModel {
  @Prop({ required: true })
  bookId: number;

  @Prop({ required: true })
  comment: string;
}

export const BookCommentSchema = SchemaFactory.createForClass(BookCommentModel);
