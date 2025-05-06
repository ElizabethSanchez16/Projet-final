'use server';

export async function modificationMusiqueAction(prevState, formData) {
    const id = formData.get('id');

    if (!id) {
        console.error("L'ID de la musique à modifier n'a pas été reçu.");
        return { error: "Erreur: ID de la musique manquant." };
    }

    try {
        const titre = formData.get('titre');
        const album = formData.get('album');
        const artiste = formData.get('artiste');
        const genre = formData.get('genre');
        const annee = formData.get('annee');
        const format = formData.get('format');
        const duration = formData.get('duration');
        const prix = formData.get('prix');
        const imageUrl = formData.get('imageUrl');
        const extraitUrl = formData.get('extraitUrl');
        const disponible = formData.get('disponible');
        const deleted = formData.get('deleted') === 'true';

        if (!titre || !album || !artiste || !genre || !annee || !format || !prix || !disponible) {
            return { error: "Erreur: Tous les champs marqués d'un astérisque sont obligatoires." };
        }

        const updatedMusique = {
            titre,
            album,
            artiste,
            genre: genre.split(',').map(g => g.trim()),
            annee: parseInt(annee),
            duration,
            imageUrl,
            extraitUrl,
            tours33: format === '33tours',
            tours45: format === '45tours',
            disponible: parseInt(disponible),
            deleted,
            prix: parseFloat(prix),
        };

        const response = await fetch(`http://localhost:3001/musiques/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedMusique),
        });

        if (response.ok) {
            const updatedData = await response.json();
            return { success: true, updatedData };
        } else {
            console.error("Erreur lors de la modification de la musique (HTTP):", response.status);
            const errorData = await response.json();
            return { error: `Erreur lors de la modification: ${response.status}`, details: errorData };
        }
    } catch (error) {
        console.error("Erreur lors de la modification de la musique (Exception):", error);
        return { error: "Erreur réseau lors de la modification." };
    }
}