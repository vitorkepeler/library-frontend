import './App.css';
import Navbar from '@/components/Navbar.tsx';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Books from '@/pages/Books.tsx';
import BookDetails from '@/pages/BookDetails.tsx';
import CreateBook from '@/pages/CreateBook.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();
  const Layout = () => (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Books />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/create" element={<CreateBook />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;