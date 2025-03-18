import { api } from '@/utils/api.ts';
import { AxiosResponse } from 'axios';
import { Book, bookSchema } from '@/models/Book.ts';
import { z } from 'zod';

export async function getAllBooks() {
  const response: AxiosResponse<Book[]> = await api.get('/book');

  return response.data;
}

export async function getBook(id: number) {
  const response: AxiosResponse<Book> = await api.get(`/book/${id}`);

  return response.data;
}

export async function rentBook(id: number) {
  await api.post(`/book/${id}`);
}

export async function deleteBook(id: number) {
  await api.delete(`/book/${id}`);
}

export async function createBook(book: z.infer<typeof bookSchema>) {
  await api.post('/book', book);
}