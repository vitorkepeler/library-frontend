import './App.css';
import Navbar from '@/components/Navbar.tsx';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Books from '@/pages/Books.tsx';
import BookDetails from '@/pages/BookDetails.tsx';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from '@/pages/Login.tsx';
import AuthProvider, { useAuth } from '@/components/AuthProvider.tsx';
import CreateBook from '@/pages/CreateBook.tsx';
import EditBook from '@/pages/EditBook.tsx';
import { toast, Toaster } from 'sonner';
import { AxiosError } from 'axios';

function App() {
  function onError(error: AxiosError<{ message: string }>) {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }

    toast.error('Error', {
      description: error.response?.data.message || 'Something went wrong',
    });
  }

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError,
    }),
    mutationCache: new MutationCache({
      onError,
    }),
  });

  const ProtectedRoute = () => {
    const { token } = useAuth();

    if (!token) {
      return <Navigate to="/login" />;
    }

    return (
      <div>
        <Navbar />
        <Outlet />
      </div>
    );
  };

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Books />} />
              <Route path="/book/:id" element={<BookDetails />} />
              <Route path="/create" element={<CreateBook />} />
              <Route path="/edit/:id" element={<EditBook />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster richColors closeButton />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;