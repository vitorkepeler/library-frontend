import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/components/AuthProvider.tsx';

export default function Navbar() {
  const navigate = useNavigate();

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
        <Button
          className="bg-destructive"
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}