//app\serversActions\setLocalStorageLastConsultedMusiqueIdAction.js
export function setLocalStorageLastConsultedMusiqueIdAction(movieId) {
    if (typeof window !== 'undefined') {
      localStorage.setItem("lastConsultedMusique", movieId);
    }
  }