//app\serversActions\getLocalStorageLastconsultedMovieIdAction.js
export function getLocalStorageLastConsultedMovieIdAction() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("lastConsultedMovie");
    }
    return null; // Retourne null si on est côté serveur
  }