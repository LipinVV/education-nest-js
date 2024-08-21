interface IBook {
  id: string;
  title: string;
  description: string;
  authors: string;
  favourite: boolean | string;
  fileCover: string;
  fileName: string;
  fileBook: string;
}

export { IBook };
