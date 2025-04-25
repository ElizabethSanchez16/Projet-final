//app\serversActions\setLocalStorageLastConsultedMovieIdAction.js
export function setLocalStorageLastConsultedMovieIdAction(movieId) {
    if (typeof window !== 'undefined') {
      localStorage.setItem("lastConsultedMovie", movieId);
    }
  }