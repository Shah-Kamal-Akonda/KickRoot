import { CartProvider } from '../../components/CartContext';
import './globals.css'; // Assuming you have global styles

export const metadata = {
  title: 'E-Commerce App',
  description: 'A Next.js e-commerce application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}