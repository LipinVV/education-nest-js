import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  authors: string[];

  @Prop()
  favourite: string;

  @Prop()
  fileCover: string;

  @Prop()
  fileName: string;

  @Prop()
  fileBook: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
