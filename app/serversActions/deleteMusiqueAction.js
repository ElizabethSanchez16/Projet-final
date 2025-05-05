//app\serversActions\deleteMusiqueAction.js
'use server';

export async function deleteMusiqueAction(id) {
    try {
        const response = await fetch(`http://localhost:3001/musiques/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ deleted: true }),
        });

        if (response.ok) {
            console.log(`Musique avec l'ID ${id} marqué comme supprimé (via Server Action).`);
            return { success: true, id: id }; // Retournez un succès et l'ID supprimé
        } else {
            console.error(`Erreur lors de la suppression de la musique avec l'ID ${id} (via Server Action):`, response.status);
            const errorData = await response.json();
            return { error: `Erreur lors de la suppression: ${response.status}`, details: errorData };
        }
    } catch (error) {
        console.error("Erreur réseau lors de la suppression de la musique (via Server Action):", error);
        return { error: "Erreur réseau lors de la suppression." };
    }
}