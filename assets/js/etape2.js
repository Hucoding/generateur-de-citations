//Etape 2 : des citations configurables

/*

    - Choisir le nombre de citations générées (de 1 à 5)

    - Choisir entre 2 types de générateurs de citations (vous devrez donc avoir 2 ensembles de phrases)

    - Une fois les citations générées, proposer de générer de nouvelles citations ou d'arrêter là le programme

*/

//Fonction qui gère les erreurs
function displayErrors(errors) {

    //création d'un élément li
    let myList2 = document.getElementById('myList2');
    
    //tant qu'ont a un enfant dans l'ol
    while(myList2.firstChild) {

        //on supprime le dernier enfant
        myList2.removeChild(myList2.lastChild);

    }

    //initialisation des erreurs à 1
    nbError = 1;

    // ?
    errors.forEach(
        
        //?
        (error) => {

        let errorList = document.createElement("LI");

        //Style > couleur orange pour les erreurs
        errorList.style.color = "red";

        //on place le li dans un ul
        myList2.appendChild(errorList);

        //text = nombre d'erreur - "citation"
        let text = document.createTextNode(error);

        //Affichage de la citation dans ul > li 
        errorList.appendChild(text);

    });

}

//Fonction pour vérifier si le nombre ajouter par l'utilisateur est de type float
function isFloat(numberQuotes) { 
    return !!(numberQuotes % 1); 
}

//Fonction pour générer jusqu'à 5 citations
function generateMultiQuotes(event) {

    let maxNumberQuotes = 5;

    //Récupération du chiffre rentré par le visiteur
    let askNumberQuotes = document.getElementById('numberQuotes').value;
    
    //initialisation des erreurs dans un tableau vide
    let errors = [];

    //si le nombre rentré est égale à 0
    if(askNumberQuotes == 0) {
        errors.push(`il y'a une erreur de saisie le nombre de citation doit etre compris entre 1 et ${maxNumberQuotes} pas plus ni moins !`);
    //sinon si le nombre rentré est supérieur à 5 
    } else if(askNumberQuotes > maxNumberQuotes) {
        errors.push(`Vous ne pouvez pas générer plus de ${maxNumberQuotes} citations !`);
    //sinon si le nombre rentré est un nombre décimal
    } else if(isFloat(askNumberQuotes) == true) {
        errors.push(`Vous devez rentrer un nombre entier !`);
    }

    //si le nombre d'erreur est supérieur à 0
    if(errors.length > 0) {

        //Alors on affiche l'erreur 
        displayErrors(errors);

    } else {

        //initialisation d'un tableau vide de citations
        let tableOfQuotes = [];

        //Paramètre concernant 'disabled' (passage de disabled à true)
        let printYesOrNoDiv = true;

        //Paramètre concernant la visibilité de la div yesOrNo
        let visibilityOfYesOrNoDiv = 'visible';

        for (let i = 1; i <= askNumberQuotes; i++) {

            //ajout de la citation dans un tableau
            tableOfQuotes.push(generateOneQuote(event, true));

            //on bloque les fonctionnalitées (input et click) à la génération des citations en passant 'disabled' à 'true' sur les ids suivants :
            // numberQuotes, successTheme, workTheme
            document.getElementById("numberQuotes").disabled = printYesOrNoDiv;
            document.getElementById("successTheme").disabled = printYesOrNoDiv;
            document.getElementById("workTheme").disabled = printYesOrNoDiv;

            //affichage d'une div avec deux proposition pour le visiteur
            document.getElementById('yesOrNo').style.visibility = visibilityOfYesOrNoDiv;

        }
        
        insertQuotes(tableOfQuotes, event);

    }


}

//Fonction concernant le choix de l'utilisateur après génération des citations
function choiceAfterGenerate(event) {

    let target = event.target;

    //Paramètre de l'input nombre de citations souhaitée
    let inputOfNumber = document.getElementById("numberQuotes");

    //Paramètre concernant 'disabled' pour le button Yes
    let disabledYes = false;

    //Paramètres concernant 'disabled' pour le button No
    let disabledNoOrjustOneQuote = true;

    //Paramètre concernant la visibilité de la div yesOrNo 
    let visibilityOfYesOrNo = 'hidden';

    //Si on sélectionne le bouton OUI
    if (target.id == "yes") {

        document.getElementById("numberQuotes").disabled = disabledYes;
        document.getElementById("successTheme").disabled = disabledYes;
        document.getElementById("workTheme").disabled = disabledYes;

        //on cache la div comportant le formulaire de choix 
        document.getElementById("yesOrNo").style.visibility = visibilityOfYesOrNo;

        //on efface les citations générées
        document.getElementById('myList2').innerHTML = "";

    //Sinon si on selectionne "NON" ou le bouton "générée 1 citation"
    } else if (target.id == "no" || target.id == "justOneQuote") {

        document.getElementById("numberQuotes").disabled = disabledNoOrjustOneQuote;
        document.getElementById("successTheme").disabled = disabledNoOrjustOneQuote;
        document.getElementById("workTheme").disabled = disabledNoOrjustOneQuote;

        //on cache la div comportant le formulaire de choix 
        document.getElementById("yesOrNo").style.visibility = visibilityOfYesOrNo;

        //on vide l'input
        inputOfNumber.value = "";

    } 

}
