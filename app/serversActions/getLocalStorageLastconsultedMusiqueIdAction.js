//app\serversActions\getLocalStorageLastconsultedMusiqueIdAction.js
export function getLocalStorageLastConsultedMusiqueIdAction() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("lastConsultedMusique");
    }
    return null;
  }