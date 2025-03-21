import { useNavigate, useParams } from 'react-router-dom';
import { Separator } from '@/components/ui/separator.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useBookQuery, useDeleteBookMutation, useRentBookMutation } from '@/hooks/useBook.ts';
import Spinner from '@/components/Spinner.tsx';
import { Loader2, Settings } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog.tsx';
import { useState } from 'react';

const BookDetails = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  let { id } = useParams();

  const queryClient = useQueryClient();

  const bookQuery = useBookQuery(Number(id));

  const rentBookMutation = useRentBookMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['book', Number(id)] });
    },
  });

  const navigate = useNavigate();

  const deleteBookMutation = useDeleteBookMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      navigate('/');
    },
  });

  const book = bookQuery.data;

  return (
    <div className="flex justify-center">
      {bookQuery.isLoading ? (
        <Spinner />
      ) : (
        <div className="flex w-2/3">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 w-full gap-4">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                {book?.title} ({book?.publicationYear})
              </h1>
              <div className="justify-self-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="border-0" variant="outline" size="icon">
                      <Settings />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuItem className="cursor-pointer" onClick={() => navigate(`/edit/${id}`)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => setOpenDeleteDialog(true)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <img src="/src/assets/lotr.jpg" alt="book" className="w-1/2" />
              <div className="flex flex-col gap-2">
                <p className="leading-7">{book?.synopsis}</p>
                <Separator className="my-4" />
                <div className="grid grid-cols-4 w-full gap-4">
                  <div className="col-span-2 gap-2">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Author</h3>
                    <p className="leading-7">{book?.author}</p>
                  </div>
                  <div className="col-span-2 gap-2">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Category</h3>
                    <p className="leading-7">{book?.category}</p>
                  </div>
                  <div className="col-span-2 gap-2">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Status</h3>
                    {book?.available ? (
                      <p className="leading-7 text-primary">Available</p>
                    ) : (
                      <p className="leading-7 text-destructive text-bold">Rented</p>
                    )}
                  </div>
                  <div className="col-span-2 gap-2 items-center">
                    <Button onClick={() => rentBookMutation.mutate(Number(id))} disabled={rentBookMutation.isPending}>
                      {rentBookMutation.isPending ? (
                        <Loader2 className="animate-spin" />
                      ) : book?.available ? (
                        'Rent'
                      ) : (
                        'Return'
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Dialog open={openDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {book?.available ? 'Are you sure you want to delete this book?' : 'This book is rented'}
            </DialogTitle>
            <DialogDescription>
              <div className="flex flex-col gap-4">
                <p>
                  {book?.available
                    ? 'This action cannot be undone. This will permanently delete the book from database.'
                    : 'The book needs to be returned before it can be deleted'}
                </p>
                <div className="flex flex-row gap-2 justify-end">
                  <Button variant="outline" onClick={() => setOpenDeleteDialog(false)}>
                    Cancel
                  </Button>
                  {book?.available && (
                    <Button
                      className="bg-destructive"
                      onClick={() => deleteBookMutation.mutate(Number(id))}
                      disabled={deleteBookMutation.isPending}
                    >
                      {deleteBookMutation.isPending ? <Loader2 className="animate-spin" /> : 'Delete'}
                    </Button>
                  )}
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookDetails;