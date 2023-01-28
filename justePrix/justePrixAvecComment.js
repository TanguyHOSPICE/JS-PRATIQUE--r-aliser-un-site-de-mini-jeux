// Generer un chiffre en aléatoire
// Utilisateur fera des proposition
// Continuer tant qu'il n'a pas la bonne proposition

//?1-Je veux lancer la partie (==>HTML:btn)-je pointe l'elt
const gameStart = document.getElementById('gameStart');
//console.log(gameStart); //!Provisoire
//?3-Donner à l'utilisateur l'oportunité de rentrer un chiffre ==>HTML:input + btn
//3a-je pointe l'elt
const checkPropalButton = document.getElementById('checkPropalButton');
//console.log(checkPropalButton); //!Provisoire
//4a-Récup Input (pr elt taper)-je pointe l'elt
const userPropalInput = document.getElementById('userPropalInput');
//console.log(userPropalInput); //!Provisoire
//8a-récup div
const resultDiv = document.getElementById('resultDiv');
console.log('============'); //!Provisoire

//2c
let NumberToFind = 0;

//?2-Attribuer une fonction au clic-Dc créer une var
gameStart.addEventListener('click', function () {
	//2a-Lancer la partie
	//2b-Récupérer un chiffre aléatoire-cherche method Math.random-En integ le chiffre max
	NumberToFind = getRandomInt(100);
	//2b.2 on vérifie que cela marche
	console.log(NumberToFind); //!Provisoire
	//alert(NumberToFind);//!Provisoire
});

//3b-Gérer clic sur btn
checkPropalButton.addEventListener('click', function () {
	//6a-Appel function checkPropal (après copie algo ,qui était à l'origine ici, ds la fonction)
	checkPropal();
});

//?7-Gérer validation du numberPropal par appui s/key-Param event
userPropalInput.addEventListener('keyup', function (event) {
	//7a-console.log(event);//==> event{key:'Enter'}
	//!Provisoire
	// console.log(event);
	// debugger;

	//7-b
	if (event.key === 'Enter') {
		checkPropal();
	}
	//6a-Appel function checkPropal (après copie algo ,qui était à l'origine ici, ds la fonction)
});
//2b
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

//?6-Mise en place fonction vu algo fait
//?8-Résultats Conditions => Add HTML:div pr injections réponses
function checkPropal() {
	//?4-Récup Input + Elt taper
	//4a-Bis-Récup valeur taper
	let numberPropal = userPropalInput.value;
	console.log(`Chiffre Tapé:${numberPropal}`);
	//?5-Vérification conditions
	if (numberPropal > NumberToFind) {
		// console.log(`C'est trop`);
		//8b-Injection
		resultDiv.innerHTML = `C'est trop !`;
		let audio = new Audio('audio/moins.mp3');
		audio.play();
	} else if (numberPropal < NumberToFind) {
		// console.log(`C'est pas assez`);
		//8c-Injection
		resultDiv.innerHTML = `C'est pas assez !`;
		let audio = new Audio('audio/plus.mp3');
		audio.play();
	} else if (numberPropal == NumberToFind) {
		// console.log(`C'est GAGNE !`);
		//8d-Injection
		resultDiv.innerHTML = `C'est GAGNE !`;
	}
}
