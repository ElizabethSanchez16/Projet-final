// app/layout.js
import { Inter } from "next/font/google";
import "./styles.css";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vinyl Haven",
  description: "A great place to search for classic Vinyls!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="main-content-wrapper">
          <Header className="fixedHeader" />
          <main className="main-content">
            {children}
          </main>
        </div>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}