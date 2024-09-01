import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { BooksService } from './books.service';
import { ITestResponse } from '../inferfaces';

describe('BooksController (e2e)', () => {
  let app: INestApplication;

  const mockBook = {
    id: 1,
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
        expect(res.body.data.length).toBe(mockBook.id);
        expect(res.body.data[0].title).toBe(mockBook.title);
      });
  });

  it('/GET books/:id', () => {
    return request(app.getHttpServer())
      .get('/books/1')
      .expect((res: ITestResponse) => {
        expect(res.body.data[0].id).toBe(mockBook.id);
        expect(res.body.data[0].title).toBe(mockBook.title);
      });
  });

  it('/PUT books/:id', () => {
    return request(app.getHttpServer())
      .put('/books/1')
      .send({ id: mockBook.id.toString(), title: 'Updated Book' })
      .expect((res: ITestResponse) => {
        expect(res.body.data[0].id).toBe(mockBook.id.toString());
        expect(res.body.data[0].title).toBe('Updated Book');
      });
  });

  it('/POST books', () => {
    return request(app.getHttpServer())
      .post('/books')
      .send({ id: mockBook.id.toString(), title: mockBook.title })
      .expect(201)
      .expect((res: ITestResponse) => {
        expect(Number(res.body.data[0].id)).toBe(mockBook.id);
        expect(res.body.data[0].title).toEqual(mockBook.title);
      });
  });

  it('/DELETE books/:id', () => {
    return request(app.getHttpServer())
      .delete('/books/1')
      .expect(200)
      .expect((res: ITestResponse) => {
        expect(res.body.data[0].id).toBe(mockBook.id);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
