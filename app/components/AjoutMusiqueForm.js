//app\components\ModificationForm.js
"use client";
import { useFormState, useState } from 'react-dom';


export default function ModificationMusiqueForm({ modificationMusiqueAction }) {
    const [state, formAction] = useFormState(modificationMusiqueAction, null);


    return (
        <>
            <div className="container mt-4">
                <h1>Modifier un Vinyl</h1>
                <form action={formAction}>

                    <div className="mb-3">
                        <label htmlFor="titre" className="form-label">Titre</label>
                        <input type="text" className="form-control" id="titre" name="titre" required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="album" className="form-label">Album</label>
                        <input type="text" className="form-control" id="album" name="album" required></input>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="artiste" className="form-label">Artiste</label>
                        <input type="text" className="form-control" id="artiste" name="artiste" required></input>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="genre" className="form-label">Genre</label>
                        <input type="text" className="form-control" id="genre" name="genre" required></input>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="année" className="form-label">Année</label>
                        <input type="number" className="form-control" id="année" name="année" required></input>
                    </div>

                    <div className="mb-3">

                        <div className="mb-3">
                            <label htmlFor="33tours" className="form-label">33 Tours</label>
                            <input type="radio" className="radio-control" value="33tours" id="33tours" name="33tours" required checked></input>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="45tours" className="form-label">45 Tours</label>
                            <input type="radio" className="radio-control" value="45tours" id="45tours" name="45tours" required></input>
                        </div>

                    </div>

                    <div className="mb-3">
                        <label htmlFor="duration" className="form-label">Durée</label>
                        <input type="text" className="form-control" id="duration" name="duration" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="prix" className="form-label">Prix</label>
                        <input type="number" className="form-control" id="prix" name="prix" required></input>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="imageUrl" className="form-label">URL de l'image</label>
                        <input type="url" className="form-control" id="imageUrl" name="imageUrl" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="extraitUrl" className="form-label">URL de l'extrait Youtube</label>
                        <input type="url" className="form-control" id="extraitUrl" name="extraitUrl" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="prix" className="form-label">Prix</label>
                        <input type="number" className="form-control" id="prix" name="prix" required></input>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="disponible" className="form-label">Quantité disponible</label>
                        <input type="number" className="form-control" id="disponible" name="disponible" required></input>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="deleted" className="form-label">Soft deleted</label>
                        <input type="boolean" className="form-control" id="deleted" name="deleted" required></input>
                    </div>












                    <button type="submit" className="btn btn-primary">Ajouter le vinyl</button>
                    {state?.error && <p className="text-danger mt-2">{state.error}</p>}
                    {state?.success && <p className="text-success mt-2">Vinyl ajouté avec succès!</p>}

                </form>
            </div>
        </>
    );
}