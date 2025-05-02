//app\components\Header.js

export default function Header() {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
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
              <a className="nav-link" href="../../boutique/panier">Panier</a>
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

            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
    </nav>
    </>
  );
}
