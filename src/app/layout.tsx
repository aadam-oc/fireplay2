import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import { ReactNode } from 'react';
import { CartProvider } from '@/context/CartContext'; // 👉 Asegúrate de que esta ruta sea correcta

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900">
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster position="top-right" />
        </CartProvider>
      </body>
    </html>
  );
}
