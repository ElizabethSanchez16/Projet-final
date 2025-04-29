//app\components\AjoutMusiqueForm.js
"use client";
import { useFormState } from 'react-dom';

export default function AjoutMusiqueForm({ ajoutMusiqueAction }) {
    const [state, formAction] = useFormState(ajoutMusiqueAction, null);

    return (
        <>
            <div className="container mt-4">
                <h1>Ajouter un nouveau film</h1>
                <form action={formAction}>
                    <div className="mb-3">
                        <label htmlFor="titre" className="form-label">Titre</label>
                        <input type="text" className="form-control" id="titre" name="titre" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" name="description" rows="3" required></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="imageUrl" className="form-label">URL de l'image</label>
                        <input type="url" className="form-control" id="imageUrl" name="imageUrl" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="duration" className="form-label">Durée</label>
                        <input type="text" className="form-control" id="duration" name="duration" />
                    </div>
                    <button type="submit" className="btn btn-primary">Ajouter le film</button>
                    {state?.error && <p className="text-danger mt-2">{state.error}</p>}
                    {state?.success && <p className="text-success mt-2">Film ajouté avec succès!</p>}



                </form>
            </div>
        </>
    );
}