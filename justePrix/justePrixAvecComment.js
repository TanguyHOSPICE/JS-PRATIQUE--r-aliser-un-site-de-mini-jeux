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
//8a-récup div result
const resultDiv = document.getElementById('resultDiv');
//9b-récup div cpt a rebours
const countdownDiv = document.getElementById('countDown');
// console.log(countdownDiv); //!Provisoire
//12b-récup div de lancement
const gamePropalDiv = document.getElementById('gamePropalDiv');
console.log('============'); //!Provisoire

//2c-
let NumberToFind = 0;
//9c-init var Tps restant
let timeStamp = 0;
//9h-compteur continu même si on re clic sur gameSart-déclare var
let counterInterval = null;

//?2-Attribuer une fonction au clic-Dc créer une var
//?9-Mise en place cpt a rebours =>html:div countdown + var
gameStart.addEventListener('click', function () {
	//console.log(NumberToFind); //!Provisoire
	//alert(NumberToFind);//!Provisoire
	//11a-Appel de la fonction launchGame
	launchGame();
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
		resultDiv.innerHTML = `C'est moins !`;
		let audio = new Audio('audio/moins.mp3');
		audio.play();
	} else if (numberPropal < NumberToFind) {
		// console.log(`C'est pas assez`);
		//8c-Injection
		resultDiv.innerHTML = `C'est plus !`;
		let audio = new Audio('audio/plus.mp3');
		audio.play();
	} else if (numberPropal == NumberToFind) {
		// console.log(`C'est GAGNE !`);
		//8d-Injection
		resultDiv.innerHTML = `C'est GAGNE !`;
	}
}
//?11-mise en place lancement partie(compteur...)
function launchGame() {
	//2a-Lancer la partie
	//2b-Récupérer un chiffre aléatoire-cherche method Math.random-En integ le chiffre max
	NumberToFind = getRandomInt(100);
	//2b.2 on vérifie que cela marche
	//9-d
	timeStamp = 30;
	//12c-Apparition de l'input pr userPropalInput
	gamePropalDiv.style.display = 'block';
	//9i-On interrompe le compteur selon la condition (relance au click gameStart)
	if (counterInterval != null) {
		clearInterval(counterInterval);
	}
	//9b-mise en place ds fonction setInterval fonction anonyme pr coutdown
	//9f-setInterval effectue sont action toutes les 1000s dc nous on veut une boucle en récursive-J'attribut une var pr l'arrêt clearInterval
	//9hBis-changement de var
	counterInterval = setInterval(() => {
		//console.log(timeStamp);//!Provisoire
		//9g-on injecte le compteur
		countdownDiv.innerText = timeStamp + ' (s)';
		//9e-décrémentation
		timeStamp--;
		//9eBis-On interrompe le compteur selon la condition (else if)
		//?10-inject & remove  alerte -add css
		if (timeStamp >= 20) {
			countdownDiv.classList.remove('warning');
			countdownDiv.classList.remove('danger');
			countdownDiv.classList.add('cool');
		} else if (timeStamp > 10) {
			countdownDiv.classList.remove('cool');
			countdownDiv.classList.remove('danger');
			countdownDiv.classList.add('warning');
		} else if (timeStamp >= 0) {
			countdownDiv.classList.remove('cool');
			countdownDiv.classList.remove('warning');
			countdownDiv.classList.add('danger');
		} else if (timeStamp < 0) {
			clearInterval(counterInterval);
			//12a-fin de partie
			endGame(false);
		}
	}, 1000);
}
//?12-mise en place fin de partie(Appeler ds launchGame)
function endGame() {
	//12d-Disparition de l'input du userPropalInput
	gamePropalDiv.style.display = 'none';
}

//2
