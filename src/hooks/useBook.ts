import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createBook, deleteBook, getAllBooks, getBook, rentBook, updateBook } from '@/services/book.service.ts';
import { bookSchema, booksFilters } from '@/models/Book.ts';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

export function useBooksQuery(page: number, filters?: booksFilters) {
  return useQuery({
    queryKey: ['books', page, filters],
    queryFn: () => getAllBooks(page, filters),
    placeholderData: keepPreviousData,
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

export function useCreateBookMutation() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (book: z.infer<typeof bookSchema>) => {
      return createBook(book);
    },
    onSuccess: (data) => {
      navigate('/book/' + data.data.id, { replace: true });
    },
  });
}

export function useUpdateBookMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookId, book }: { bookId: number; book: z.infer<typeof bookSchema> }) => {
      return updateBook(bookId, book);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['book', data.data.id] });
      navigate('/book/' + data.data.id, { replace: true });
    },
  });
}