//app/components/Header.js
"use client";
import '../styles.css';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const router = useRouter();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [cartCount, setCartCount] = useState(0);

  const handleSearch = (query) => {
    console.log("Búsqueda:", query);
    // Aquí puedes filtrar datos o hacer una petición API
  };

  useEffect(() => {
    const getLoggedInStatus = () => {
      const loggedIn = localStorage.getItem('isUserLoggedIn');
      setIsUserLoggedIn(loggedIn === 'true');
      const storedUsername = localStorage.getItem('username');
      setUsername(storedUsername || '');

    };

    getLoggedInStatus();

    const handleUserLoggedIn = () => {
      getLoggedInStatus();
    };

    const handleUserLoggedOut = () => {
      localStorage.removeItem('username');
      getLoggedInStatus();
    };

    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
      setCartCount(JSON.parse(storedCart).length);
    }

    const handleCartUpdated = () => {
      const updatedCart = sessionStorage.getItem('cart');
      setCartCount(updatedCart ? JSON.parse(updatedCart).length : 0);
    };

    window.addEventListener('cartUpdated', handleCartUpdated);
    window.addEventListener('userLoggedIn', handleUserLoggedIn);
    window.addEventListener('userLoggedOut', handleUserLoggedOut);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdated);
      window.removeEventListener('userLoggedIn', handleUserLoggedIn);
      window.removeEventListener('userLoggedOut', handleUserLoggedOut);
    };

  }, []);


  const handleLogout = () => {
    localStorage.removeItem('isUserLoggedIn');
    localStorage.removeItem('username');
    setIsUserLoggedIn(false);
    setUsername('');
    window.dispatchEvent(new Event('userLoggedOut'));
    router.push('/');
  };

  const handleLogin = () => {
    router.push('/connexion');
  };

  return (
    <nav className={`navbar navbar-expand-lg bg-body-tertiary bg-dark fixedHeader`} data-bs-theme="none">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Vinyl Haven</a>
        {isUserLoggedIn ? (
          <a className="navbar-brand" href="/profil">Profil de {username}</a>
        ) : (null)}

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="../../boutique/panier">Mise de coté ({cartCount})</a>
            </li>
          </ul>

          {isUserLoggedIn ? (
            <button className="btn btn-outline-danger" onClick={handleLogout}>Déconnexion</button>
          ) : (
            <button className="btn btn-outline-success" onClick={handleLogin}>Connexion</button>
          )}
        </div>
      </div>
    </nav>
  );
}