type BookFavourite = boolean | string;

interface IBook {
  id: string;
  title: string;
  description: string;
  authors: string;
  favourite: BookFavourite;
  fileCover: string;
  fileName: string;
  fileBook: string;
}

export { IBook, BookFavourite };
