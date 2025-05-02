//administration\modificationmusique\page.js
import Header from "../components/Header";

import ModificationMusiqueForm from "../components/ModificationMusiqueForm";

import { modificationMusiqueAction } from "../serversActions/modificationMusiqueAction";


export default async function PageModificationMusique() {
    return (
        <>
            <Header />
            <ModificationMusiqueForm modificationMusiqueAction={modificationMusiqueAction} />
        </>
    );
}