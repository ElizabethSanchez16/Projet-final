"use client";
import { useState, useEffect, useCallback } from 'react';
import { useFormState } from 'react-dom';
import { modificationMusiqueAction } from '@/app/serversActions/modificationMusiqueAction';
import { deleteMusiqueAction } from '@/app/serversActions/deleteMusiqueAction';

export default function ModificationMusiqueForm() {
    const [musiques, setMusiques] = useState([]);
    const [selectedMusiqueId, setSelectedMusiqueId] = useState('');
    const [titreDraft, setTitreDraft] = useState('');
    const [albumDraft, setAlbumDraft] = useState('');
    const [artisteDraft, setArtisteDraft] = useState('');
    const [genreDraft, setGenreDraft] = useState('');
    const [anneeDraft, setAnneeDraft] = useState('');
    const [formatDraft, setFormatDraft] = useState('33tours');
    const [durationDraft, setDurationDraft] = useState('');
    const [prixDraft, setPrixDraft] = useState('');
    const [imageUrlDraft, setImageUrlDraft] = useState('');
    const [extraitUrlDraft, setExtraitUrlDraft] = useState('');
    const [disponibleDraft, setDisponibleDraft] = useState('');
    const [deletedDraft, setDeletedDraft] = useState('false');
    const [modificationState, modificationFormAction] = useFormState(modificationMusiqueAction, null);
    const [suppressionState, suppressionFormAction] = useFormState(async (prevState, formData) => {
        const idToDelete = formData.get('id');
        const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce vinyl ?");
        if (confirmed) {
            const result = await deleteMusiqueAction(idToDelete);
            if (result?.success) {
                window.location.reload();
            }
            return result;
        }
        return { error: "Suppression annulée." };
    }, null);
    const [modificationSummary, setModificationSummary] = useState(null);
    const [initialMusiqueData, setInitialMusiqueData] = useState(null);

    const fetchMusiques = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:3001/musiques");
            if (response.ok) {
                const data = await response.json();
                setMusiques(data);
            } else {
                console.error("Erreur lors de la récupération des musiques:", response.status);
            }
        } catch (error) {
            console.error("Erreur réseau:", error);
        }
    }, []);

    useEffect(() => {
        fetchMusiques();
    }, [fetchMusiques]);

    useEffect(() => {
        if (modificationState?.success) {
            fetchMusiques();
            window.location.reload();
        }
    }, [modificationState?.success, fetchMusiques]);

    const handleMusiqueSelection = useCallback((event) => {
        const musiqueId = event.target.value;
        setSelectedMusiqueId(musiqueId);
        const selectedMusique = musiques.find(musique => musique.id === musiqueId);

        if (selectedMusique) {
            setInitialMusiqueData(selectedMusique);
            setTitreDraft(selectedMusique.titre || '');
            setAlbumDraft(selectedMusique.album || '');
            setArtisteDraft(selectedMusique.artiste || '');
            setGenreDraft(selectedMusique.genre ? selectedMusique.genre.join(', ') : '');
            setAnneeDraft(selectedMusique.annee ? selectedMusique.annee.toString() : '');
            setFormatDraft(selectedMusique.tours33 ? '33tours' : (selectedMusique.tours45 ? '45tours' : '33tours'));
            setDurationDraft(selectedMusique.duration || '');
            setPrixDraft(selectedMusique.prix ? selectedMusique.prix.toString() : '');
            setImageUrlDraft(selectedMusique.imageUrl || '');
            setExtraitUrlDraft(selectedMusique.extraitUrl || '');
            setDisponibleDraft(selectedMusique.disponible ? selectedMusique.disponible.toString() : '');
            setDeletedDraft(selectedMusique.deleted ? 'true' : 'false');
            setModificationSummary(null);
        } else {
            resetForm();
            setInitialMusiqueData(null);
            setModificationSummary(null);
        }
    }, [musiques]);

    const resetForm = useCallback(() => {
        setSelectedMusiqueId('');
        setTitreDraft('');
        setAlbumDraft('');
        setArtisteDraft('');
        setGenreDraft('');
        setAnneeDraft('');
        setFormatDraft('33tours');
        setDurationDraft('');
        setPrixDraft('');
        setImageUrlDraft('');
        setExtraitUrlDraft('');
        setDisponibleDraft('');
        setDeletedDraft('false');
        setModificationSummary(null);
        setInitialMusiqueData(null);
    }, []);

    const handleInputChange = useCallback((event) => {
        const { name, value } = event.target;

        switch (name) {
            case 'titre': setTitreDraft(value); break;
            case 'album': setAlbumDraft(value); break;
            case 'artiste': setArtisteDraft(value); break;
            case 'genre': setGenreDraft(value); break;
            case 'annee': setAnneeDraft(value); break;
            case 'format': setFormatDraft(value); break;
            case 'duration': setDurationDraft(value); break;
            case 'prix': setPrixDraft(value); break;
            case 'imageUrl': setImageUrlDraft(value); break;
            case 'extraitUrl': setExtraitUrlDraft(value); break;
            case 'disponible': setDisponibleDraft(value); break;
            case 'deleted': setDeletedDraft(value); break;
            default: break;
        }

        if (initialMusiqueData) {
            setModificationSummary(prevSummary => {
                const changes = { ...prevSummary } || {};
                if (value !== initialMusiqueData.titre && name === 'titre') changes.titre = { ancienne: initialMusiqueData.titre, nouvelle: value };
                else if (name === 'titre' && changes.titre) delete changes.titre;

                if (value !== initialMusiqueData.album && name === 'album') changes.album = { ancienne: initialMusiqueData.album, nouvelle: value };
                else if (name === 'album' && changes.album) delete changes.album;

                if (value !== initialMusiqueData.artiste && name === 'artiste') changes.artiste = { ancienne: initialMusiqueData.artiste, nouvelle: value };
                else if (name === 'artiste' && changes.artiste) delete changes.artiste;

                const initialGenre = initialMusiqueData.genre ? initialMusiqueData.genre.join(', ') : '';
                if (value !== initialGenre && name === 'genre') changes.genre = { ancienne: initialGenre, nouvelle: value };
                else if (name === 'genre' && changes.genre) delete changes.genre;

                if (value !== initialMusiqueData.annee?.toString() && name === 'annee') changes.annee = { ancienne: initialMusiqueData.annee, nouvelle: value };
                else if (name === 'annee' && changes.annee) delete changes.annee;

                const formatInitial = initialMusiqueData.tours33 ? '33tours' : (initialMusiqueData.tours45 ? '45tours' : '33tours');
                const formatNouveau = value === '33tours' ? '33 Tours' : '45 Tours';
                const formatAncien = formatInitial === '33tours' ? '33 Tours' : '45 Tours';
                if (value !== formatInitial && name === 'format') changes.format = { ancienne: formatAncien, nouvelle: formatNouveau };
                else if (name === 'format' && changes.format) delete changes.format;

                if (value !== initialMusiqueData.duration && name === 'duration') changes.duration = { ancienne: initialMusiqueData.duration || 'N/A', nouvelle: value || 'N/A' };
                else if (name === 'duration' && changes.duration) delete changes.duration;

                if (value !== initialMusiqueData.prix?.toString() && name === 'prix') changes.prix = { ancienne: initialMusiqueData.prix, nouvelle: value };
                else if (name === 'prix' && changes.prix) delete changes.prix;

                if (value !== initialMusiqueData.disponible?.toString() && name === 'disponible') changes.disponible = { ancienne: initialMusiqueData.disponible, nouvelle: value };
                else if (name === 'disponible' && changes.disponible) delete changes.disponible;

                const deletedInitial = initialMusiqueData.deleted ? 'Oui' : 'Non';
                const deletedNouveau = value === 'true' ? 'Oui' : 'Non';
                if (value !== (initialMusiqueData.deleted ? 'true' : 'false') && name === 'deleted') changes.deleted = { ancienne: deletedInitial, nouvelle: deletedNouveau };
                else if (name === 'deleted' && changes.deleted) delete changes.deleted;

                if (value !== initialMusiqueData.imageUrl && name === 'imageUrl') changes.imageUrl = { ancienne: initialMusiqueData.imageUrl || 'N/A', nouvelle: value || 'N/A' };
                else if (name === 'imageUrl' && changes.imageUrl) delete changes.imageUrl;

                if (value !== initialMusiqueData.extraitUrl && name === 'extraitUrl') changes.extraitUrl = { ancienne: initialMusiqueData.extraitUrl || 'N/A', nouvelle: value || 'N/A' };
                else if (name === 'extraitUrl' && changes.extraitUrl) delete changes.extraitUrl;

                return Object.keys(changes).length > 0 ? changes : null;
            });
        }
    }, [initialMusiqueData]);


    const handleSubmit = (formData) => {
        formData.set('titre', titreDraft);
        formData.set('album', albumDraft);
        formData.set('artiste', artisteDraft);
        formData.set('genre', genreDraft);
        formData.set('annee', anneeDraft);
        formData.set('format', formatDraft);
        formData.set('duration', durationDraft);
        formData.set('prix', prixDraft);
        formData.set('imageUrl', imageUrlDraft);
        formData.set('extraitUrl', extraitUrlDraft);
        formData.set('disponible', disponibleDraft);
        formData.set('deleted', deletedDraft);
        modificationFormAction(formData);
    };

    return (
        <div className="container mt-4">
            <h1>Modifier ou Supprimer un Vinyl</h1>

            <div className="mb-3">
                <label htmlFor="selectionMusique" className="form-label">Sélectionner un vinyl à modifier ou supprimer</label>
                <select className="form-select" id="selectionMusique" onChange={handleMusiqueSelection} value={selectedMusiqueId || ''}>
                    <option value="">-- Choisir un vinyl --</option>
                    {musiques.map(musique => (
                        <option key={musique.id} value={musique.id}>{musique.titre} - {musique.artiste}</option>
                    ))}
                </select>
            </div>

            {selectedMusiqueId && (
                <>
                    <form action={handleSubmit}>
                        <input type="hidden" name="id" value={selectedMusiqueId} />
                        <div className="mb-3">
                            <label htmlFor="titre" className="form-label">Titre</label>
                            <input type="text" className="form-control" id="titre" name="titre" value={titreDraft} onChange={handleInputChange} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="album" className="form-label">Album</label>
                            <input type="text" className="form-control" id="album" name="album" value={albumDraft} onChange={handleInputChange} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="artiste" className="form-label">Artiste</label>
                            <input type="text" className="form-control" id="artiste" name="artiste" value={artisteDraft} onChange={handleInputChange} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="genre" className="form-label">Genre (séparer par des virgules)</label>
                            <input type="text" className="form-control" id="genre" name="genre" value={genreDraft} onChange={handleInputChange} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="annee" className="form-label">Année</label>
                            <input type="number" className="form-control" id="annee" name="annee" value={anneeDraft} onChange={handleInputChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Format</label>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" value="33tours" id="33tours" name="format" checked={formatDraft === '33tours'} onChange={handleInputChange} required />
                                <label className="form-check-label" htmlFor="33tours">33 Tours</label>
                            </div>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" value="45tours" id="45tours" name="format" checked={formatDraft === '45tours'} onChange={handleInputChange} required />
                                <label className="form-check-label" htmlFor="45tours">45 Tours</label>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="duration" className="form-label">Durée</label>
                            <input type="text" className="form-control" id="duration" name="duration" value={durationDraft} onChange={handleInputChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="prix" className="form-label">Prix</label>
                            <input type="number" className="form-control" id="prix" name="prix" value={prixDraft} onChange={handleInputChange} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="imageUrl" className="form-label">URL de l'image</label>
                            <input type="url" className="form-control" id="imageUrl" name="imageUrl" value={imageUrlDraft} onChange={handleInputChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="extraitUrl" className="form-label">URL de l'extrait Youtube</label>
                            <input type="url" className="form-control" id="extraitUrl" name="extraitUrl" value={extraitUrlDraft} onChange={handleInputChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="disponible" className="form-label">Quantité disponible</label>
                            <input type="number" className="form-control" id="disponible" name="disponible" value={disponibleDraft} onChange={handleInputChange} required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="deleted" className="form-label">Soft deleted</label>
                            <select className="form-select" id="deleted" name="deleted" value={deletedDraft} onChange={handleInputChange} required>
                                <option value="false">False</option>
                                <option value="true">True</option>
                            </select>
                        </div>

                        {modificationSummary && (
                            <div className="mt-2 alert alert-warning">
                                <h5>Modifications :</h5>
                                <ul>
                                    {Object.entries(modificationSummary).map(([key, values]) => (
                                        <li key={key}>
                                            {key === 'titre' && 'Titre : '}
                                            {key === 'album' && 'Album : '}
                                            {key === 'artiste' && 'Artiste : '}
                                            {key === 'genre' && 'Genre : '}
                                            {key === 'annee' && 'Année : '}
                                            {key === 'format' && 'Format : '}
                                            {key === 'duration' && 'Durée : '}
                                            {key === 'prix' && 'Prix : '}
                                            {key === 'disponible' && 'Disponible : '}
                                            {key === 'deleted' && 'Supprimé (soft) : '}
                                            {key === 'imageUrl' && 'Image URL : '}
                                            {key === 'extraitUrl' && 'Extrait URL : '}
                                            {values.ancienne} <span className="fw-bold">→</span> {values.nouvelle}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary me-2">Modifier le vinyl</button>
                    </form>

                    {modificationState?.error && <p className="text-danger mt-2">{modificationState.error}</p>}
                    {modificationState?.success && <p className="text-success mt-2">Vinyl modifié avec succès!</p>}

                    <form action={suppressionFormAction} className="mt-3">
                        <input type="hidden" name="id" value={selectedMusiqueId} />
                        <button type="submit" className="btn btn-danger">Supprimer le vinyl</button>
                        {suppressionState?.error && <p className="text-danger mt-2">{suppressionState.error}</p>}
                        {suppressionState?.success && <p className="text-success mt-2">Vinyl supprimé avec succès!</p>}
                    </form>
                </>
            )}
        </div>
    );
}