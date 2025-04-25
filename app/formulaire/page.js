export default function () {
    async function processForm(data){
        console.log(data.get("nom"))
    }
}

export default function (){
    return <form>
        <imput type="text" name="nom"></imput>
        <button type="submit">Envoyer</button>
    </form>
}
