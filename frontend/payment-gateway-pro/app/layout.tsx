import './globals.css';

export const metadata = {
  title: 'Payment Gateway',
  description: 'Modern UI for Payment Service',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 min-h-screen text-gray-900">
        <main className="max-w-4xl mx-auto py-10">{children}</main>
      </body>
    </html>
  );
}