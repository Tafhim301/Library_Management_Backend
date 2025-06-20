export interface IBooks {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FUNCTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}
