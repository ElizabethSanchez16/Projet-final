//app\serversActions\deleteMovieAction.js
'use server';

export async function deleteMovieAction(id) {
    try {
        const response = await fetch(`http://localhost:3001/films/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ deleted: true }),
        });

        if (response.ok) {
            console.log(`Film avec l'ID ${id} marqué comme supprimé (via Server Action).`);
            return { success: true, id: id }; // Retournez un succès et l'ID supprimé
        } else {
            console.error(`Erreur lors de la suppression du film avec l'ID ${id} (via Server Action):`, response.status);
            const errorData = await response.json();
            return { error: `Erreur lors de la suppression: ${response.status}`, details: errorData };
        }
    } catch (error) {
        console.error("Erreur réseau lors de la suppression du film (via Server Action):", error);
        return { error: "Erreur réseau lors de la suppression." };
    }
}