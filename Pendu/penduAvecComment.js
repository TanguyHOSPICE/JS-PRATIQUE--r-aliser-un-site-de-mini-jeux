/*
TODO #4:
  X-Générer 1 mot aléatoire
  X-Afficher le mot à deviner en masqué_ _ _ _ _ _
  -Pouvoir proposer des lettres
  -Afficher les lettres proposées/trouvées
  -Gérer le nb d'erreurs max
*/
//import des librairies
import { Utils } from '../Lib/Utils/utils.js';

//1-Déclarer var pour démarrer le jeu
const btnPlay = document.getElementById('beginGame');
//2-Déclarer var qui est un tableau de mots
//(idéal aurait été de récupérer un fichier externe :API générateur de mots fr ou librairie de mots)
const allWords = [
	'pomme',
	'banane',
	'orange',
	'fraise',
	'melon',
	'poire',
	'cerise',
	'raisin',
	'mangue',
	'kiwi',
	'ananas',
	'pasteque',
	'framboise',
	'cassis',
	'abricot',
	'prune',
	'peche',
	'nectarine',
	'pamplemousse',
	'citron',
	'noix',
	'noisette',
	'amande',
];
const wordToFindDiv = document.getElementById('wordToFindDiv'); //4b
const KeyBoardDiv = document.getElementById('KeyBoard'); //8b

let wordToFind; // 4a-
let wordToFindArray = []; //4c

//3-eventListener sur le bouton pour démarrer le jeu
btnPlay.addEventListener('click', function () {
	initGame();
});

//8- function: Générer 1 clavier
function generateKeyBoard() {
	//8-c- Réinitialiser le div qui va contenir le clavier
	KeyBoardDiv.innerHTML = '';
	//8-a- Déclarer var qui va contenir l'alphabet
	let Alphabet = generateAlphabet();
	//8-b- boucle qui va parcourir l'alphabet et afficher les lettres
	Alphabet.forEach((letter) => {
		//8-b-1- Déclarer un div qui va contenir la lettre
		let lettreDiv = document.createElement('div');
		//8-b-2- Ajouter la lettre au div
		lettreDiv.innerHTML = letter;
		//8-b-3- Ajouter une classe au div
		lettreDiv.classList.add('letterKeyBoard');
		//8-b-4- Ajouter le div au div qui contient le clavier
		KeyBoardDiv.appendChild(lettreDiv);
	});
}

//7- function: Générer l'alphabet
function generateAlphabet(capital = false) {
	//7- Retourne un tbl de 26 lettres qui va récupérer les lettres ave code ASCII
	//return [...Array(26)].map((_, i) => String.fromCharCode(i + (capital ? 65 : 97)));//7-a-

	// OU
	//7-b-
	let tab = [];
	/* for (let i = 0; i < 26; i++) {
		if (capital) {
			tab.push(String.fromCharCode(i + 65));
		} else {
			tab.push(String.fromCharCode(i + 97));
		}
	} //+ return tab;
  */
	// OU
	//7-c-
	let i = 65;
	if (!capital) {
		i += 32;
	}

	let finish = i + 26; //Comme le i s'incrémente il faut lui donner une valeur de "fin"
	for (i; i < finish; i++) {
		tab.push(String.fromCharCode(i));
	}

	return tab;
}

//4- fonction : Démarrer le jeu
function initGame() {
	//4e- Réinitialiser le div qui va contenir le mot à trouver
	wordToFindDiv.innerHTML = '';
	// 4a- Déclarer var qui va contenir le mot à trouver
	wordToFind = generateWord();
	console.log(wordToFind); //TODO: à supprimer
	//4b- Afficher le mot à deviner
	//wordToFindDiv.innerHTML = wordToFind; //TODO: à supprimer après avoir fait la fonction 4d
	//4c- tranformer mon mot (wordToFind) en 1 tableau qui va contenir les lettres trouvées
	//wordToFindArray = wordToFind.split('');
	// OU
	wordToFindArray = Array.from(wordToFind);
	// OU wordToFindArray = [...wordToFind];
	//console.log(wordToFindArray); //TODO: à supprimer

	//4d-
	//4d-1- Déclarer une table qui crée un élts qui va contenir les lettres trouvées
	let table = document.createElement('table');
	//4d-2- Déclarer une ligne, Elt de la table
	let line = document.createElement('tr');

	//4d-3- Boucle qui va parcourir le tableau et afficher les lettres trouvées
	wordToFindArray.forEach((letter) => {
		//4d-3-a- Déclarer une cellule (td = case de la table) par lettre
		let td = document.createElement('td');
		//4d-3-b- Ajouter une propriété à la cellule qui va contenir la lettre (utilisation des data attributs)
		//? https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes#javascript_access
		td.dataset.letter = letter;
		//4d-3-c- Afficher la lettre trouvée en masqué
		td.innerText = '_';
		//4d-3-d- Ajouter la cellule à la ligne
		line.appendChild(td);
	});
	//console.log(wordToFindArray); //TODO: à supprimer
	//4d-2-e Ajouter la ligne à la table
	table.appendChild(line);
	//4d-2-f Ajouter la table au div
	wordToFindDiv.appendChild(table);

	//4f(8)- Appeler la fonction qui va générer le clavier
	generateKeyBoard();
}

//5- function: Generer mot aléatoire
function generateWord() {
	//5b(6)- déclarer var qui va contenir le mot aléatoire : allWords.length = longueur du tableau
	let indexWord = Utils.getRandomInt(allWords.length);
	//5a-Doit retourner un mot aléatoire
	return allWords[indexWord];
}

//6- function: récup entier aléatoire (=> importé de utils.js)
