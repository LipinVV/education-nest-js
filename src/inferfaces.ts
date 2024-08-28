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

interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  _id: string;
}

export { IBook, BookFavourite, IUser };
