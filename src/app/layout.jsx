import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <link 
        rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" 
      />
      <body>
        {children}
      </body>
    </html>
  );
}

