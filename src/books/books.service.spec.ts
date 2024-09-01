import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { BooksService } from './books.service';
import { Book, BookDocument } from '../schemas/book.schema';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

// имитируем книгу
const mockBook = {
  id: 'UID1',
  title: 'Test Book',
  description: 'Test Description',
  authors: ['Author 1', 'Author 2'],
  favourite: true,
  fileCover: 'bookCover.jpg',
  fileName: 'file.pdf',
  fileBook: 'fileBook.pdf',
};

const mockBookModel = {
  // имитируем методы модели
  find: jest.fn().mockResolvedValue([mockBook]),
  create: jest.fn().mockResolvedValue(mockBook),
  save: jest.fn().mockResolvedValue({}),
  findByIdAndUpdate: jest.fn().mockResolvedValue(mockBook),
  findOneAndDelete: jest.fn().mockResolvedValue(mockBook),
};

describe('BooksService', () => {
  let service: BooksService;
  let model: Model<BookDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: mockBookModel, // имитируем модель книги
        },
        {
          provide: 'DatabaseConnection', // имитируем зависимости DatabaseConnection
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    model = module.get<Model<BookDocument>>(getModelToken(Book.name));
  });

  it('сервис должен быть определён', () => {
    expect(service).toBeDefined();
  });

  it('сервис должен возвращать массив книг', async () => {
    const result = await service.getAll();
    expect(result).toEqual([mockBook]);
    expect(model.find).toHaveBeenCalled();
  });

  it('сервис должен возвращать книгу по ID', async () => {
    const result = await service.getBook('1');
    const singleBook = result && result[0]; // ответ одной книги прилетит в массиве
    expect(singleBook).toEqual(mockBook);
    expect(model.find).toHaveBeenCalledWith({ id: '1' }); // обязательно сравниваем методы Монго (тут - find), применяемые в сервисе с теми, которые в тестах
    // иначе можно нарваться на ошибку, при несовпадении методов в сервисе и тестах
  });

  it('сервис должен создавать книгу', async () => {
    const newBook = await service.create(mockBook);
    expect(newBook).toEqual(mockBook);
    expect(model.create).toHaveBeenCalledWith(mockBook);
  });

  it('сервис должен обновлять книгу', async () => {
    const updatedBook = await service.updateBook('UID1', mockBook);
    expect(updatedBook).toEqual(mockBook);
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith('UID1', mockBook, {
      new: true,
    });
  });

  it('сервис должен выбрасывать исключение, если книга для обновления не найдена', async () => {
    mockBookModel.findByIdAndUpdate.mockResolvedValue(null); // имитируем отсутствие книги
    await expect(service.updateBook('UID1', mockBook)).rejects.toThrow(
      new NotFoundException(`Book #UID1 is not found`),
    );
  });

  it('сервис должен удалять книгу', async () => {
    const result = await service.deleteBook('UID1');
    expect(result).toBe(`Book #UID1 was deleted`);
    expect(model.findOneAndDelete).toHaveBeenCalledWith({ id: 'UID1' });
  });

  it('сервис должен выбрасывать исключение, если книга для удаления не найдена', async () => {
    mockBookModel.findOneAndDelete.mockResolvedValue(null); // имитируем отсутствие книги
    await expect(service.deleteBook('UID1')).rejects.toThrow(
      new NotFoundException(`Book #UID1 is not found`),
    );
  });
});
