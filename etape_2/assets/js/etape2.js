//Etape 2 : des citations configurables

/*

    - Choisir le nombre de citations générées (de 1 à 5)

    - Choisir entre 2 types de générateurs de citations (vous devrez donc avoir 2 ensembles de phrases)

    - Une fois les citations générées, proposer de générer de nouvelles citations ou d'arrêter là le programme

*/

// Morceaux de citation des différents thèmes 
let quotes = {

    //THEME - citation réussite
    success: {

        firstPart: [
            'Ce sont vos modes de pensées',
            'Le travail est un des domaines',
            'La réussite est un état d esprit',
            'Vous êtes maître de votre vie',
            'La discipline est un excellent maître'
        ],

        middlePart: [
            ', qui décident si',
            ', si vous aimez ce que vous faites',
            ', soyez l histoire de réussite que vous chercher',
            ', soyez l inspiration que les autres suivent',
            ', soyez ceux qui survivent à une relation à distance'
        ],

        lastPart: [
            ', vous allez réussir ou échouer.',
            ', un nouveau monde s ouvrira à vous.',
            ', vous êtes peut-être à un pas de la réussite.',
            ', vous en avez les clefs.',
            ', ce n est jamais une histoire de chance.'
        ]

    },

    //THEME - citation sur le travail
    work: {

        firstPart: [
            'Le travail paie dans le futur',
            'Le travail n est pas seulement une nécessité',
            'Les rêves donnent du travail',
            'Travail avec courage et persévèrance',
            'Travaillez dur'
        ],

        middlePart: [
            ', pour en être beaucoup récompensé',
            ', quand le travail est un plaisir',
            ', plus vous travaillez',
            ', le travail est l occasion de se redécouvrir soit même',
            ', le travail c est la santé'
        ],

        lastPart: [
            ', la paresse elle paie comptant.',
            ', la vie est belle.',
            ', car la tenacité permet d atteindre l excellence.',
            ', plus elle vous sourit.',
            ', mais le travail finit toujours par payer.'
        ]

    }

}

//On masque la div yesOrNo qui ne s'affiche qu'à la génération de plusieurs citations (étape2)
document.getElementById('yesOrNo').style.visibility = 'hidden';

let maxNumberQuotes = 5;

function initialize() {

    //optimisation de l'attribut max de l'input id => "numberQuotes"
    document.getElementById("numberQuotes").setAttribute("max", maxNumberQuotes);

}

//Fonction qui retourne un nombre aléatoire
function maxNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//Composition d'une citation
let myQuote = {
    constructQuote: function (firstPart, middlePart, lastPart){
        this.firstPart = firstPart;
        this.middlePart = middlePart;
        this.lastPart = lastPart;
        let construct = this.firstPart + this.middlePart + this.lastPart;
        return construct;
    }
};

//Objet pour la création d'une seule citation
let oneQuoteGenerateThemeObject = Object.create(myQuote);

inputNumber = document.getElementById('numberQuotes');
buttonSuccessTheme = document.getElementById('successTheme');
buttonWorkTheme = document.getElementById('workTheme');
buttonYes = document.getElementById('yes');
buttonNo = document.getElementById('no');


//Bouton pour le Thème réussite
buttonSuccessTheme.addEventListener('click', 
    event => {
        generateMultiQuotes(event);
    }
);

//Bouton pour le Thème Travail
buttonWorkTheme.addEventListener('click', 
    event => {
        generateMultiQuotes(event);
    }
);

//Bouton OUI
buttonYes.addEventListener('click', 
    event => {
        choiceAfterGenerate(event);
    }
);

//Bouton NON
buttonNo.addEventListener('click', 
    event => {
        choiceAfterGenerate(event);
    }
);

//identification de l'input cliquer par l'utilisateur
inputNumber.addEventListener('click',
    event => {
        initialize(event);
    }
);

//cette fonction à été créer pour mettre en place des solutions d'optimisations
function initialize(event) {

    let target = event.target;

    //SI l'input est cliquer par l'utilisateur alors place la limite maxNumberQuotes
    if (target.id == "numberQuotes") {

        //optimisation de l'attribut max de l'input id => "numberQuotes"
        document.getElementById("numberQuotes").setAttribute("max", maxNumberQuotes);

    }

}


//Génération d'une citation en fonction de l'id du bouton cliquer par l'utilisateur
function generateOneQuoteWithTheme(event) {

    let target = event.target;

    //Si le thème 'Réussite' est choisi
    if (target.id == "successTheme") {

        //Theme sélectionner pour générer plusieurs citations avec le theme "Réussite"
        let multiQuoteGenerateWithSuccessTheme = quotes.success;
        return multiQuoteGenerateWithSuccessTheme;
    
    //Sinon si le thème 'Travail' est choisi
    } else if (target.id  == "workTheme") {

        //Theme sélectionner pour générer une plusieurs citation avec le theme "Travail"
        let multiQuoteGenerateWithWorkTheme = quotes.work;
        return multiQuoteGenerateWithWorkTheme;
    
    } 

} 

//fonction pour la génération d'une citation
function generateOneQuote(event, multi) {

    let quoteWithTheme = generateOneQuoteWithTheme(event);
    
    let firstPart  = quoteWithTheme.firstPart[maxNumber(maxNumberQuotes)];
    let middlePart = quoteWithTheme.middlePart[maxNumber(maxNumberQuotes)];
    let lastPart = quoteWithTheme.lastPart[maxNumber(maxNumberQuotes)];

    //Cette variable 'oneQuoteGenerate' contient construction de la citation avec les différentes parties (firstPart + middlePart + lastPart)
    let oneQuoteGenerate = oneQuoteGenerateThemeObject.constructQuote(firstPart, middlePart, lastPart);

    if(!multi) {
        insertQuotes(oneQuoteGenerate, event);
    } else {
        return oneQuoteGenerate;
    }
        
}

//Fonction pour insérer les citations 
function insertQuotes(quote) {
    
    // Définition d'un array vide au cas ou il y aurait plusieurs citations à générer
    //arrayQuote est créer pour ne pas avoir l'erreur du forEach car forEarch ne peut pas une fonction d'une string
    let arrayQuote = []; 

    if (typeof quote == 'object') { 
        arrayQuote = quote;
    }

    //Liste concernant la 2ème étape
    let myList2 = document.getElementById('myList2'); 

    //tant qu'ont a un enfant dans myList2
    while(myList2.firstChild) {

        //on supprime le dernier enfant (pour ne pas qu'il s'affiche à la suite)
        myList2.removeChild(myList2.lastChild);

    }

    // Pour chaque citations (entrée) du tableau on réalise les actions suivantes :
    // on édite une citation dans myList2 avec un li et on intégre notre citation générée.
    arrayQuote.forEach(

        (quote) => {

            //Liste concernant la 2ème étape
            let myList2 = document.getElementById('myList2');

            //création d'un  élément li
            let quoteList = document.createElement("LI");

            //passage de la citation dans la liste de l'étape 2
            myList2.appendChild(quoteList);

            let text = document.createTextNode(quote);

            //Affichage de la citation  
            quoteList.appendChild(text);

        }
    );
    
}


//Fonction qui gère les erreurs
function displayErrors(errors) {

    //création d'un élément li
    let myList2 = document.getElementById('myList2');
    
    //tant qu'ont a un enfant dans l'ol
    while(myList2.firstChild) {

        //on supprime le dernier enfant
        myList2.removeChild(myList2.lastChild);

    }

    errors.forEach(
        
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

        }
    );

}

//Fonction pour vérifier si le nombre ajouter par l'utilisateur est de type float
function isFloat(numberQuotes) { 
    return !!(numberQuotes % 1); 
}

//Fonction pour générer jusqu'à 5 citations
function generateMultiQuotes(event) {

    let maxNumberQuotesGenerate = 5;

    //Récupération du chiffre rentré par le visiteur
    let askNumberQuotes = document.getElementById('numberQuotes').value;
    
    //initialisation des erreurs dans un tableau vide
    let errors = [];

    //si le nombre rentré est égale à 0
    if(askNumberQuotes == 0) {
        errors.push(`il y'a une erreur de saisie le nombre de citation doit etre compris entre 1 et ${maxNumberQuotesGenerate} pas plus ni moins !`);
    //sinon si le nombre rentré est supérieur à 5 
    } else if(askNumberQuotes > maxNumberQuotes) {
        errors.push(`Vous ne pouvez pas générer plus de ${maxNumberQuotesGenerate} citations !`);
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
    } else if (target.id == "no") {

        document.getElementById("numberQuotes").disabled = disabledNoOrjustOneQuote;
        document.getElementById("successTheme").disabled = disabledNoOrjustOneQuote;
        document.getElementById("workTheme").disabled = disabledNoOrjustOneQuote;

        //on cache la div comportant le formulaire de choix 
        document.getElementById("yesOrNo").style.visibility = visibilityOfYesOrNo;

        //on vide l'input
        inputOfNumber.value = "";

    } 

}