// app/serversActions/ajoutMusiqueAction.js
'use server';

export async function ajoutMusiqueAction(prevState, formData) {
    console.log("formData reçu dans la Server Action:", formData);

    if (!formData) {
        console.error("formData est null ou undefined!");
        return { error: "Erreur: Les données du formulaire n'ont pas été reçues par le serveur." };
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

        console.log("Titre:", titre);
        console.log("Album:", album);
        console.log("Artiste:", artiste);
        console.log("Genre:", genre);
        console.log("Année:", annee);
        console.log("Format:", format);
        console.log("Durée:", duration);
        console.log("Prix:", prix);
        console.log("Image URL:", imageUrl);
        console.log("Extrait URL:", extraitUrl);
        console.log("Disponible:", disponible);
        console.log("Deleted:", deleted);

        if (!titre || !album || !artiste || !genre || !annee || !format || !prix || !disponible) {
            return { error: "Erreur: Tous les champs marqués d'un astérisque sont obligatoires." };
        }

        const newMusique = {
            titre,
            album,
            artiste,
            genre: [genre],
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

        const response = await fetch("http://localhost:3001/musiques", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newMusique),
        });

        if (response.ok) {
            return { success: true };
        } else {
            console.error("Erreur lors de l'ajout de la musique (HTTP):", response.status);
            const errorData = await response.json();
            console.error("Détails de l'erreur:", errorData);
            return { error: `Erreur lors de l'ajout de la musique: ${response.status}` };
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout de la musique (Exception):", error);
        return { error: "Erreur réseau lors de l'ajout de la musique." };
    }
}