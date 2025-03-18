import BooksList from '@/components/BooksList.tsx';
import { useBooksQuery } from '@/hooks/useBook.ts';

const Books = () => {
  const booksQuery = useBooksQuery();

  console.log(booksQuery.status);

  return (
    <div className="flex justify-center">
      <BooksList data={booksQuery.data ?? []} loading={booksQuery.isLoading} />
    </div>
  );
};

export default Books;