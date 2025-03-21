'use client';

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button.tsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import { useState } from 'react';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@radix-ui/react-dropdown-menu';
import Spinner from '@/components/Spinner.tsx';
import { columns } from '@/components/Columns.tsx';
import { useBooksQuery } from '@/hooks/useBook.ts';
import { Loader2 } from 'lucide-react';

export default function BooksList() {
  const [page, setPage] = useState(0);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filters, setFilters] = useState({ title: '', author: '', category: '' });
  const [columnFilters, setColumnFilters] = useState(filters);
  const booksQuery = useBooksQuery(page, filters);

  const applyFilters = () => {
    setFilters(columnFilters);
  };

  const clearFilters = () => {
    setColumnFilters({ title: '', author: '', category: '' });
    setFilters({ title: '', author: '', category: '' });
  };

  const table = useReactTable({
    columns,
    data: booksQuery.data?.books ?? [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="w-2/3">
      <div className="flex items-end gap-4 py-4">
        <div>
          <Label>Title</Label>
          <Input
            placeholder="Ex: Lord of the Rings"
            value={columnFilters.title}
            onChange={(event) => setColumnFilters({ ...columnFilters, title: event.target.value })}
            className="max-w-sm border-border"
          />
        </div>
        <div>
          <Label>Author</Label>
          <Input
            placeholder="Ex: Tolkien"
            value={columnFilters.author}
            onChange={(event) => setColumnFilters({ ...columnFilters, author: event.target.value })}
            className="max-w-sm border-border"
          />
        </div>
        <div>
          <Label>Category</Label>
          <Input
            placeholder="Ex: Fantasy"
            value={columnFilters.category}
            onChange={(event) => setColumnFilters({ ...columnFilters, category: event.target.value })}
            className="max-w-sm border-border"
          />
        </div>
        <div className="flex flex-row gap-2">
          <Button onClick={applyFilters}>Filtrar</Button>
          <Button onClick={clearFilters} variant="outline">
            Limpar
          </Button>
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
            {booksQuery.isLoading ? (
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
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 0}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setPage((old) => old + 1);
          }}
          disabled={
            (booksQuery.data && booksQuery.data.totalPages - 1 === page) ||
            booksQuery.isPlaceholderData ||
            booksQuery.isLoading
          }
        >
          {booksQuery.isPlaceholderData ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Next'}
        </Button>
      </div>
    </div>
  );
}