//Etape 1 : des citations aléatoires

/*

    - Les citations sont générées aléatoirement une par une à chaque appel du programme JavaScript

    - Chaque citation est la combinaison d'au moins 3 morceaux de phrases (à vous de préparer ces morceaux de phrase)

    - A défaut d'être intelligible, la phrase doit être cohérente (pas de point d'exclamation au milieu d'une phrase)

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

let maxNumberQuotes = 5;

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

loadBody = document.getElementById('body');
buttonJustOneQuote = document.getElementById('justOneQuote');

//Bouton pour générer 1 seule citation
buttonJustOneQuote.addEventListener('click',
    event => {
        generateOneQuote(event);
    }
);

//Génération automatique d'une seule citation après le refresh de la page
window.addEventListener('load',
    event => {
        generateOneQuote(event);
    }
);


//Génération d'une citation en fonction de l'id du bouton cliquer par l'utilisateur
function generateOneQuoteWithTheme(event) {

    let target = event.target;

    //Si l'utilisateur clique sur le bouton ayant l'id "justOneQuote"
    if (target.id  === "justOneQuote") {

        let oneQuoteGenerateTheme = quotes.success;
        return oneQuoteGenerateTheme;
    
    //Sinon génère une citation en auto quoi qu'il arrive 
    } else {

        let oneQuoteGenerateTheme = quotes.success;
        return oneQuoteGenerateTheme;

    }

}

//fonction pour la génération d'une citation
function generateOneQuote(event) {

    let quoteWithTheme = generateOneQuoteWithTheme(event);
    
    let firstPart  = quoteWithTheme.firstPart[maxNumber(maxNumberQuotes)];
    let middlePart = quoteWithTheme.middlePart[maxNumber(maxNumberQuotes)];
    let lastPart = quoteWithTheme.lastPart[maxNumber(maxNumberQuotes)];

    //Cette variable 'oneQuoteGenerate' contient construction de la citation avec les différentes parties (firstPart + middlePart + lastPart)
    let oneQuoteGenerate = oneQuoteGenerateThemeObject.constructQuote(firstPart, middlePart, lastPart);

    insertQuotes(oneQuoteGenerate, event);

}

//Fonction pour insérer les citations 
function insertQuotes(quote, event) {
    
    // Définition d'un array vide au cas ou il y aurait plusieurs citations à générer
    //arrayQuote est créer pour ne pas avoir l'erreur du forEach car forEarch ne peut pas une fonction d'une string
    let arrayQuote = []; 

    if (typeof quote == 'object') { 
        arrayQuote = quote;
    }

    //Liste concernant la 1ère étape
    let myList = document.getElementById('myList');

    //si l'utilisateur à cliquer sur 'Générer 1 citation'
    if(event.target.id == "justOneQuote") {

        //tant qu'ont a un enfant dans myList 
        while(myList.firstChild) {

            //on supprime le dernier enfant (pour ne pas qu'il s'affiche à la suite)
            myList.removeChild(myList.lastChild);
    
        }

    } 

    //Si le tableau de citation est vide
    if(arrayQuote.length == 0) {

        //création d'un élément li
        let quoteList = document.createElement("LI");

        //passage de la citation dans la liste de l'étape 1
        myList.appendChild(quoteList);

        let text = document.createTextNode(quote);

        //Affichage de la citation 
        quoteList.appendChild(text);

    } 
    
}