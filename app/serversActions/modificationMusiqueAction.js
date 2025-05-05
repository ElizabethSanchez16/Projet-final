//app\serversActions\modificationMusiqueAction.js
'use server';

export async function modificationMusiqueAction(prevState, formData) {
    console.log("formData reçu dans la Server Action:", formData);

    if (!formData) {
        console.error("formData est null ou undefined!");
        return { error: "Erreur: Les données du formulaire n'ont pas été reçues par le serveur." };
    }

    try {
        const titre = formData.get('titre');
        const description = formData.get('description');
        const imageUrl = formData.get('imageUrl');
        const duration = formData.get('duration');

        console.log("Titre:", titre);
        console.log("Description:", description);
        console.log("Image URL:", imageUrl);
        console.log("Durée:", duration);

        if (!titre || !description) {
            return { error: "Erreur: Le titre et la description sont obligatoires." };
        }

        const newFilm = {
            titre,
            description,
            imageUrl,
            duration,
            deleted: false,
        };

        const response = await fetch("http://localhost:3001/films", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newFilm),
        });

        if (response.ok) {
            return { success: true };
        } else {
            console.error("Erreur lors de l'ajout du film (HTTP):", response.status);
            const errorData = await response.json();
            console.error("Détails de l'erreur:", errorData);
            return { error: `Erreur lors de l'ajout du film: ${response.status}` };
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout du film (Exception):", error);
        return { error: "Erreur réseau lors de l'ajout du film." };
    }
}