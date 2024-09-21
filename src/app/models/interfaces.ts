export interface Livro {
  title:               string;
  authors:             Array<string>;
  publisher:           string;
  publishedDate:       string;
  description:         string;
  previewLink:         string;
  imageLinks:          ImageLinks;
}

export interface ImageLinks {
  thumbnail:      string;
}

export interface Item {
  volumeInfo: Livro;
}

export interface LivrosResultados {
  items: Array<Item>,
  totalItems: number
}
