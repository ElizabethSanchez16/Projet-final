//app/components/Header.js
"use client";
import '../styles.css';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const router = useRouter();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const getLoggedInStatus = () => {
      const loggedIn = localStorage.getItem('isAdminLoggedIn');
      setIsAdminLoggedIn(loggedIn === 'true');
    };

    getLoggedInStatus();

    const handleAdminLoggedIn = () => {
      getLoggedInStatus();
    };

    const handleAdminLoggedOut = () => {
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
    window.addEventListener('adminLoggedIn', handleAdminLoggedIn);
    window.addEventListener('adminLoggedOut', handleAdminLoggedOut);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdated);
      window.removeEventListener('adminLoggedIn', handleAdminLoggedIn);
      window.removeEventListener('adminLoggedOut', handleAdminLoggedOut);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    setIsAdminLoggedIn(false);
    window.dispatchEvent(new Event('adminLoggedOut'));
    router.push('/administration/connexion');
  };

  const handleLogin = () => {
    router.push('/administration/connexion');
  };

  return (
    <nav className={`navbar navbar-expand-lg bg-body-tertiary bg-dark fixedHeader`} data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Vinyl Haven</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="../../administration/ajoutmusique">Ajout Musique</a>
            </li>
          </ul>

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="../../administration/modificationmusique">Modification Musique</a>
            </li>
          </ul>

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="../../boutique/panier">Mise de coté ({cartCount})</a>
            </li>
          </ul>

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="https://www.canva.com/design/DAGmBePhDAU/Ly_Kzs-t1MOfIjy3og6CVw/edit?utm_content=DAGmBePhDAU&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">Présentation Canva</a>
            </li>
          </ul>

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="https://github.com/ElizabethSanchez16/Projet-final.git">Dépot Github</a>
            </li>
          </ul>

          <form className="d-flex me-2" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>

          {isAdminLoggedIn ? (
            <button className="btn btn-outline-danger" onClick={handleLogout}>Déconnexion</button>
          ) : (
            <button className="btn btn-outline-success" onClick={handleLogin}>Connexion</button>
          )}
        </div>
      </div>
    </nav>
  );
}