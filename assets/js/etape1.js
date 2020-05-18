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

//de base on cache la div yesOrNo
document.getElementById('yesOrNo').style.visibility = 'hidden';

//Nombre de morceau de citations Max
let maxNumberQuotes = 5;

//Fonction pour nombre aléatoire
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

// Objet pour la création d'une citation
let oneQuoteGenerateThemeObject = Object.create(myQuote);

// Création de l'objet "travail"
let workQuotes = Object.create(myQuote);

// Création de l'objet "réussite"
let succesQuotes = Object.create(myQuote);

loadBody = document.getElementById('body');
buttonJustOneQuote = document.getElementById('justOneQuote');
buttonSuccessTheme = document.getElementById('successTheme');
buttonWorkTheme = document.getElementById('workTheme');
buttonYes = document.getElementById('yes');
buttonNo = document.getElementById('no');

//Bouton pour générer 1 seule citation
buttonJustOneQuote.addEventListener('click',
    event => {
        generateOneQuote(event);
        choiceAfterGenerate(event);
    }
);

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

//Génération automatique d'une seule citation après refresh de la page
window.addEventListener('load',
    event => {
        generateOneQuote(event);
    }
);


//Génération d'une citation en fonction de l'id du bouton cliquer par le visiteur
function generateOneQuoteWithTheme(event) {

    let target = event.target;

    if (target.id == "successTheme") {

        //Theme sélectionner pour générer plusieurs citations avec le theme "Résussite"
        let multiQuoteGenerateWithSuccessTheme = quotes.success;
        return multiQuoteGenerateWithSuccessTheme;

    } else if (target.id  == "workTheme") {

        //Theme sélectionner pour générer une plusieurs citation avec le theme "Travail"
        let multiQuoteGenerateWithWorkTheme = quotes.work;
        return multiQuoteGenerateWithWorkTheme;

    } else if (target.id  === "justOneQuote") {

        //Theme sélectionner pour générer une seule citation
        let oneQuoteGenerateTheme = quotes.success;
        return oneQuoteGenerateTheme;

    } else {

        let oneQuoteGenerateTheme = quotes.success;
        return oneQuoteGenerateTheme;

    }

} 

//Etape 1 : des citations aléatoires

/*

    - Les citations sont générées aléatoirement une par une à chaque appel du programme JavaScript

    - Chaque citation est la combinaison d'au moins 3 morceaux de phrases (à vous de préparer ces morceaux de phrase)

    - A défaut d'être intelligible, la phrase doit être cohérente (pas de point d'exclamation au milieu d'une phrase)

*/

// myList = emplacement pour génération d'une citation
let element = document.getElementById('myList');

//fonction pour la génération d'une citation
function generateOneQuote(event, multi = false) {

    //appel de la fonction "generateOneQuoteWithTheme" dans une variable qui détermine le choix du visiteur (sur quoi il à cliquer)
    let quoteWithTheme = generateOneQuoteWithTheme(event);
    
    //génération de la 1ère partie de citation
    let firstPart  = quoteWithTheme.firstPart[maxNumber(maxNumberQuotes)];

    //génération de la 2ème partie de la citation
    let middlePart = quoteWithTheme.middlePart[maxNumber(maxNumberQuotes)];

    //génération de la 3ème partie de la citation
    let lastPart = quoteWithTheme.lastPart[maxNumber(maxNumberQuotes)];

    //variable contenant la génération d'une citation
    let oneQuoteGenerate = oneQuoteGenerateThemeObject.constructQuote(firstPart, middlePart, lastPart);

    if(!multi) {
        insertQuotes(oneQuoteGenerate, event);
    } else {
        return oneQuoteGenerate;
    }

}

//Fonction pour insérer les citations 
function insertQuotes(quote, event) {
    
    // Définition d'un array vides au cas ou il y ai plusieurs citations
    // arrayQuote est créer pour ne pas avoir l'erreur du forEach car forEarch ne peut pas etre une fontion d'une string
    let arrayQuote = []; 

    // Si l'argument quote est un array alors on met quote dans arrayQuote
    if (typeof quote == 'object') { 
        arrayQuote = quote;
    }

    let myList = document.getElementById('myList');

    let myList2 = document.getElementById('myList2'); 
    //tant qu'ont a un enfant dans l'ul 
    if(event.target.id == "justOneQuote") {
        while(myList.firstChild) {

            //on supprime le dernier enfant (pour ne pas qu'il s'affiche à la suite)
            myList.removeChild(myList.lastChild);
    
        }
    } else if(event.target.id != "justOneQuote") {
        //tant qu'ont a un enfant dans l'ol
        while(myList2.firstChild) {

            //on supprime le dernier enfant (pour ne pas qu'il s'affiche à la suite)
            myList2.removeChild(myList2.lastChild);

        }
    }

    if(arrayQuote.length == 0) {

        //création d'un  élément li
        let li = document.createElement("LI");

        //on place le li dans un ul 
        myList.appendChild(li);

        //Passage de la citation générée dans un "li"
        let text = document.createTextNode(quote);

        //Affichage de la citation dans ul > li 
        li.appendChild(text);

    } else {

        arrayQuote.forEach(

            (quote) => {

                let myList2 = document.getElementById('myList2');

                let li = document.createElement("LI");

                //on place le li dans un ul 
                myList2.appendChild(li);

                //text = nombre de citations - "la citation"
                let text = document.createTextNode(quote);

                //Affichage de la citation dans ul > li 
                li.appendChild(text);

            }
        );
    }
    
}
