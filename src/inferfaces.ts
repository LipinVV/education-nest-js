import { BookDocument } from './schemas/book.schema';

type BookFavourite = boolean | string;

interface IBook {
  id: string;
  title: string;
  description: string;
  authors: string[];
  favourite: BookFavourite;
  fileCover: string;
  fileName: string;
  fileBook: string;
}

interface ITestResponse {
  body: {
    status: string;
    data: BookDocument[];
  };
}
export { IBook, BookFavourite, ITestResponse };
