import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RxjsModule } from './rxjs/rxjs.module';
import { MONGO_DB_URL } from './constants';

@Module({
  imports: [BooksModule, MongooseModule.forRoot(MONGO_DB_URL), RxjsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
