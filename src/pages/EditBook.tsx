import { useParams } from 'react-router-dom';
import { useBookQuery } from '@/hooks/useBook.ts';
import Spinner from '@/components/Spinner.tsx';
import BookForm from '@/components/BookForm.tsx';

const EditBook = () => {
  const { id } = useParams();
  const { data: book, isLoading } = useBookQuery(Number(id));

  if (isLoading) return <Spinner />;
  if (!book) return <p>Livro não encontrado</p>;

  return <BookForm book={book} />;
};

export default EditBook;