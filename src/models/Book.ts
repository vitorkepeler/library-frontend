import { z } from 'zod';

export interface Book {
  id: number;
  title: string;
  synopsis: string;
  author: string;
  category: string;
  publicationYear: string;
  available: boolean;
}

export const books: Book[] = [
  {
    id: 1,
    title: 'Book.ts 1',
    author: 'Author 1',
    synopsis: 'Description 1',
    available: true,
    category: 'Category 1',
    publicationYear: '2023',
  },
  {
    id: 2,
    title: 'Book.ts 2',
    author: 'Author 2',
    synopsis: 'Description 2',
    available: true,
    category: 'Category 2',
    publicationYear: '2023',
  },
  {
    id: 3,
    title: 'Book.ts 3',
    author: 'Author 3',
    synopsis: 'Description 3',
    available: false,
    category: 'Category 3',
    publicationYear: '2023',
  },
  {
    id: 4,
    title: 'Book.ts 4',
    author: 'Author 3',
    synopsis: 'Description 3',
    available: false,
    category: 'Category 4',
    publicationYear: '2023',
  },
];

export const bookSchema = z.object({
  title: z.string().min(1),
  synopsis: z.string().min(1),
  author: z.string().min(1),
  category: z.string().min(1),
  publicationYear: z.string().min(4).max(4).regex(/^\d+$/, 'Must be a valid year'),
});