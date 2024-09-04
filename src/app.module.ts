import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RxjsModule } from './rxjs/rxjs.module';
import { MONGO_DB_URL } from './constants';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BookCommentsService } from './book-comments/book-comments.service';
import { BookCommentsModule } from './book-comments/book-comments.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    BooksModule,
    MongooseModule.forRoot(MONGO_DB_URL),
    RxjsModule,
    UserModule,
    AuthModule,
    BookCommentsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
