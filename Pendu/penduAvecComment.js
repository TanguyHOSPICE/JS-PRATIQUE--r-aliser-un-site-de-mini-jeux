/*
TODO #4:
  X-Générer 1 mot aléatoire
  X-Afficher le mot à deviner en masqué_ _ _ _ _ _
  X-Pouvoir proposer des lettres
  X-Afficher les lettres proposées/trouvées
  X-Gérer le nb d'erreurs max
  -Gérer la victoire
  
*/
//import des librairies
import { Confetti } from '../Lib/confetti.js';
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
const cptErreurDiv = document.getElementById('cptErreur'); //8d-16
const imgPendu = document.getElementById('imagePendu'); //10

let wordToFind; // 4a-
let wordToFindArray = []; //4c
let cptErreur = 0; //8d
let cptLettresTrouvées = 0; //8d-14

//3-eventListener sur le bouton pour démarrer le jeu
btnPlay.addEventListener('click', function () {
	initGame();
});

//4- fonction : Démarrer le jeu
function initGame() {
	//4i(8d-17)- Réinitialiser Confetti
	Confetti.stopAnimationConfeti();
	//4g(8d)- Réinitialiser le compteur d'erreur
	cptErreur = 0;
	//4g(8d-14)- Réinitialiser le compteur de lettres trouvées
	cptLettresTrouvées = 0;
	//10-c- Réinitialiser le div qui va contenir le pendu
	imgPendu.className = '';
	//10-d- Ajouter la classe qui va afficher l'image du pendu en fonction du nombre d'erreurs
	imgPendu.classList.add('etat' + cptErreur);
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
	//4h(8d-2)- Ajouter un id à la ligne qui va contenir/afficher le mot à trouver
	line.id = 'LineOfWord';

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

		//8-d(9)- Appeler la fonction qui va gérer les clicks sur chaques lettres cliquées
		lettreDiv.addEventListener('click', () => {
			//8-d-1- Vérifier si la lettre est dans le mot
			if (checkLetterInWord(letter)) {
				//v-----------------------------v//
				//8-d-2- Si oui, afficher la lettre dans le mot
				let lineWord = document.getElementById('LineOfWord');
				//8-d-7- On récupère ts les td de la ligne qui contient le mot à trouver
				let allTdOfWord = lineWord.children;
				//8-d-8- On tansforme la ligne en tableau pour pouvoir utiliser forEach dessus (car on ne peut pas utiliser forEach sur un HTMLCollection) => https://developer.mozilla.org/fr/docs/Web/API/HTMLCollection => https://developer.mozilla.org/fr/docs/Web/API/Element/children
				Array.from(allTdOfWord).forEach((td) => {
					//8-d-9- Si la lettre cliquée est égale à la lettre du mot à trouver
					if (td.dataset.letter == letter) {
						//8-d-10- On affiche la lettre ds le mot
						td.innerHTML = letter;
						//8-d-14- On incrémente le compteur de lettres trouvées
						cptLettresTrouvées++;
					}
				});
				//E-----------------------------E//
				//8-d-15- On vérifie si le nombre de lettres trouvées est égal au nombre de lettres du mot à trouver (taille du tableau)
				if (cptLettresTrouvées == wordToFindArray.length) {
					//8-d-16- On réinitialise le compteur de claviers
					KeyBoardDiv.innerHTML = '';

					//8-d-17- Si oui, on affiche le message de victoire
					//document.getElementById('cptErreur').innerHTML = 'Gagné, vous avez trouvé le mot.';
					cptErreurDiv.innerHTML = `Gagné, vous avez trouvé le mot en ${cptErreur} erreur(s).`;
					//8-d-18- Confettis
					Confetti.launchAnimationConfeti();
					setTimeout(() => {
						Confetti.stopAnimationConfeti();
					}, 5000);
				}
			} else {
				//8-d-3- Si non, afficher le pendu => incrémenter le compteur d'erreurs
				//8-d-5- Incrémenter le compteur d'erreurs
				cptErreur++;
				//8-d-6- Afficher ds le span le compteur d'erreurs
				//document.getElementById('cptErreur').innerHTML = cptErreur;
				cptErreurDiv.innerHTML = cptErreur;
				//10-a- Réinitialiser le div qui va contenir le pendu
				imgPendu.className = '';
				//10-b- Ajouter la classe qui va afficher l'image du pendu en fonction du nombre d'erreurs
				imgPendu.classList.add('etat' + cptErreur);
				//8-d-11- On gère le nombre d'erreurs
				if (cptErreur >= 4) {
					//8-d-12- Si le compteur d'erreurs est supérieur ou égal à 4, on affiche le message de défaite
					//document.getElementById('cptErreur').innerHTML ='Perdu, vous avez fait plus de 4 erreurs.';
					cptErreurDiv.innerHTML = 'Perdu, vous avez fait plus de 4 erreurs.';
					//v-----------------------------v//
					//8-d-13- On affiche le mot à trouver
					let lineWord = document.getElementById('LineOfWord');
					let allTdOfWord = lineWord.children;

					Array.from(allTdOfWord).forEach((td) => {
						if (td.dataset.letter == letter) {
							td.innerHTML = td.dataset.letter;
						}
					});
					//8-d-14- On vide le clavier
					KeyBoardDiv.innerHTML = '';
					//E-----------------------------E//
				}
			}
			//8-d-4- Masquer la lettre cliquée
			lettreDiv.style.visibility = 'hidden';
		});
	});
}

//9- function: Vérifier si la lettre est dans le mot
function checkLetterInWord(letter) {
	//9-a-2- Déclarer var qui va définir la lettre à trouver comme non trouvée
	let findLetter = false;
	//9-a- Pr chaque lettre du mot à trouver, la lettre en paramètre est dans la liste des lettres du mot à trouver
	wordToFindArray.forEach((letterOfWord) => {
		if (letter === letterOfWord) {
			//9-a-1-
			//alert('trouvé'); //TODO: à supprimer quand on aura vérifié les clicks 8-d(9)
			//9-a-3- Déclarer findletter true
			findLetter = true;
		}
	});
	//9-a-4- Retourner false pr sortir de la fonction
	return findLetter;
}
