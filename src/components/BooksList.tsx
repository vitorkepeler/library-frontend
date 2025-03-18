'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button.tsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Book } from '@/models/Book.ts';
import Spinner from '@/components/Spinner.tsx';

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
];

interface BooksListProps {
  data: Book[];
  loading: boolean;
}

export default function BooksList({ data, loading }: BooksListProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="w-2/3">
      <div className="flex items-center py-4 gap-2">
        <div>
          <Label>Title</Label>
          <Input
            placeholder="Ex: Lord of the Rings"
            value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
            className="max-w-sm border-border"
          />
        </div>
        <div>
          <Label>Author</Label>
          <Input
            placeholder="Ex: Tolkien"
            value={(table.getColumn('author')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('author')?.setFilterValue(event.target.value)}
            className="max-w-sm border-border"
          />
        </div>
        <div>
          <Label>Category</Label>
          <Input
            placeholder="Ex: Fantasy"
            value={(table.getColumn('category')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('category')?.setFilterValue(event.target.value)}
            className="max-w-sm border-border"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  );
}