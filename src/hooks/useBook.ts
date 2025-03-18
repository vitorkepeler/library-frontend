import { useMutation, useQuery } from '@tanstack/react-query';
import { createBook, deleteBook, getAllBooks, getBook, rentBook } from '@/services/book.service.ts';
import { bookSchema } from '@/models/Book.ts';
import { z } from 'zod';

export function useBooksQuery() {
  return useQuery({
    queryKey: ['books'],
    queryFn: getAllBooks,
  });
}

export function useBookQuery(id: number) {
  return useQuery({
    queryKey: ['book', id],
    queryFn: () => getBook(id),
  });
}

export function useRentBookMutation({ onSuccess }: { onSuccess?: () => void }) {
  return useMutation({
    mutationFn: (id: number) => {
      return rentBook(id);
    },
    onSuccess,
  });
}

export function useDeleteBookMutation({ onSuccess }: { onSuccess?: () => void }) {
  return useMutation({
    mutationFn: (id: number) => {
      return deleteBook(id);
    },
    onSuccess,
  });
}

export function useCreateBookMutation({ onSuccess }: { onSuccess?: () => void }) {
  return useMutation({
    mutationFn: (book: z.infer<typeof bookSchema>) => {
      return createBook(book);
    },
    onSuccess,
  });
}