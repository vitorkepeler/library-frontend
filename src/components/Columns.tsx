import { ColumnDef } from '@tanstack/react-table';
import { Book } from '@/models/Book.ts';
import { Button } from '@/components/ui/button.tsx';
import { ArrowUpDown, Loader2 } from 'lucide-react';
import { useRentBookMutation } from '@/hooks/useBook.ts';
import { useQueryClient } from '@tanstack/react-query';

const SentButton = ({ bookId, available }: { bookId: number; available: boolean }) => {
  const queryClient = useQueryClient();

  const rentBookMutation = useRentBookMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });

  return (
    <Button onClick={() => rentBookMutation.mutate(bookId)} disabled={rentBookMutation.isPending}>
      {rentBookMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : available ? 'Rent' : 'Return'}
    </Button>
  );
};

export const columns: ColumnDef<Book>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'author',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Author
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'available',
    header: 'Available',
    cell: ({ row }) => (
      <div>
        {row.getValue('available') ? (
          <span className="text-primary font-bold">Available</span>
        ) : (
          <span className="text-destructive font-bold">Rented</span>
        )}
      </div>
    ),
  },
  {
    header: 'Details',
    cell: ({ row }) => (
      <Button variant="outline" onClick={() => (window.location.href = `/book/${row.original.id}`)}>
        Details
      </Button>
    ),
  },
  {
    header: 'Rent',
    cell: ({ row }) => <SentButton bookId={row.original.id} available={row.original.available} />,
  },
];