//administration\ajoutmusique\page.js
import Header from "../components/Header";

import AjoutMusiqueForm from "../components/AjoutMusiqueForm";
import { ajoutMusiqueAction } from "../serversActions/ajoutMusiqueAction";


export default async function PageAjoutMusique() {
    return (
        <>
            <Header />
            <AjoutMusiqueForm ajoutMusiqueAction={ajoutMusiqueAction} />
        </>
    );
}