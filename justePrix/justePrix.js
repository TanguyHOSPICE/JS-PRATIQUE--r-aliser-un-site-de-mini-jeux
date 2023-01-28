//!UNCOMMENT the link on html file justPrix.html

// Generer un chiffre en aléatoire
// Utilisateur fera des proposition
// Continuer tant qu'il n'a pas la bonne proposition

const gameStart = document.getElementById('gameStart');
const checkPropalButton = document.getElementById('checkPropalButton');
const userPropalInput = document.getElementById('userPropalInput');
const resultDiv = document.getElementById('resultDiv');

let NumberToFind = 0;

gameStart.addEventListener('click', function () {
	NumberToFind = getRandomInt(100);
});

checkPropalButton.addEventListener('click', function () {
	checkPropal();
});

userPropalInput.addEventListener('keyup', function (event) {
	if (event.key === 'Enter') {
		checkPropal();
	}
});

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function checkPropal() {
	let numberPropal = userPropalInput.value;

	if (numberPropal > NumberToFind) {
		resultDiv.innerHTML = `C'est trop !`;
	} else if (numberPropal < NumberToFind) {
		resultDiv.innerHTML = `C'est pas assez !`;
	} else if (numberPropal == NumberToFind) {
		resultDiv.innerHTML = `C'est GAGNE !`;
	}
}
