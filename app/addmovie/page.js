// app/addmovie/page.js
import Header from "../components/Header";
import AddMovieForm from "../components/AddMovieForm";
import { addMovieAction } from "../serversActions/addMovieAction"; // Importez la Server Action


export default async function PageAddMovie() {
    return (
        <>
            <Header />
            <AddMovieForm addMovieAction={addMovieAction} /> {/* Passez la Server Action comme prop */}
        </>
    );
}