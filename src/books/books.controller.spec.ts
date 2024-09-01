import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { BooksService } from './books.service';
import { ITestResponse } from '../inferfaces';

describe('BooksController (e2e)', () => {
  let app: INestApplication;

  const mockBook = {
    id: 'id',
    title: 'Test Book',
    toObject: jest.fn().mockReturnThis(), // <- без такого явного определения тесты руинятся, нужно знание методов сторонних библиотек и их определение в тестах
  };

  const booksService = {
    create: jest.fn().mockImplementation((book) => ({
      ...mockBook,
      ...book,
    })),
    getAll: jest.fn().mockResolvedValue([mockBook]),
    getBook: jest.fn().mockImplementation((id) => ({
      ...mockBook,
      id: id,
    })),
    updateBook: jest.fn().mockImplementation((id, book) => ({
      ...mockBook,
      id: id,
      ...book,
    })),
    deleteBook: jest.fn().mockResolvedValue(mockBook),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(BooksService)
      .useValue(booksService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET books', () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect((res: ITestResponse) => {
        expect(res.body.data.length).toBe(1);
        expect(res.body.data[0].title).toBe('Test Book');
      });
  });
  afterAll(async () => {
    await app.close();
  });
});
