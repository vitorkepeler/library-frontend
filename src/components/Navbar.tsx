import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MenuIcon } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="flex h-16 w-full items-center justify-between bg-primary px-4 md:px-6 mb-4">
      <div className="flex items-center gap-2">
        <img src="/src/assets/book.png" alt="logo" className="h-10 w-10" />
        <span className="text-lg font-bold hidden sm:block">Library</span>
      </div>
      <nav className="hidden items-center gap-4 md:flex">
        <a href="/">Home</a>
        <a href="/create">Register a book</a>
      </nav>
      <div className="flex gap-1">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MenuIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-primary sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium" />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}