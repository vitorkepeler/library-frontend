import { AxiosResponse } from 'axios';
import { Book, bookSchema, booksFilters, BooksResponse } from '@/models/Book.ts';
import { z } from 'zod';
import api from '@/utils/api.ts';

export async function getAllBooks(page: number, filters?: booksFilters) {
  const params = new URLSearchParams({ page: String(page) });

  if (filters) {
    if (filters.title) params.append('title', filters.title);
    if (filters.author) params.append('author', filters.author);
    if (filters.category) params.append('category', filters.category);
  }

  const response: AxiosResponse<BooksResponse> = await api.get(`/book?${params.toString()}`);

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

export async function createBook(book: z.infer<typeof bookSchema>): Promise<AxiosResponse<Book>> {
  return await api.post('/book', book);
}

export async function updateBook(bookId: number, book: z.infer<typeof bookSchema>): Promise<AxiosResponse<Book>> {
  return await api.put(`/book/${bookId}`, book);
}