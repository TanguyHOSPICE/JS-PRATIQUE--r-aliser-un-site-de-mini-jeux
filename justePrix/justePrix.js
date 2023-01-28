//!UNCOMMENT the link on html file justPrix.html

// Generer un chiffre en aléatoire
// Utilisateur fera des proposition
// Continuer tant qu'il n'a pas la bonne proposition

const gameStart = document.getElementById('gameStart');
const checkPropalButton = document.getElementById('checkPropalButton');
const userPropalInput = document.getElementById('userPropalInput');
const resultDiv = document.getElementById('resultDiv');
const countdownDiv = document.getElementById('countDown');

let NumberToFind = 0;
let counterInterval = null;


gameStart.addEventListener('click', function () {
	NumberToFind = getRandomInt(100);
	timeStamp = 10;

	let counter = setInterval(() => {
		resultDiv.innerHTML = timeStamp + ' seconde(s)';
		timeStamp--;
		counterInterval = setInterval(() => {
			
			resultDiv.innerHTML = timeStamp + ' seconde(s)';
		if (timeStamp < 0) {
			clearInterval(counter);
		}
	}, 1000);
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
		resultDiv.innerHTML = `C'est moins !`;
		let audio = new Audio('audio/moins.mp3');
		audio.play();
	} else if (numberPropal < NumberToFind) {
		resultDiv.innerHTML = `C'est plus !`;
		let audio = new Audio('audio/plus.mp3');
		audio.play();
	} else if (numberPropal == NumberToFind) {
		resultDiv.innerHTML = `C'est GAGNE !`;
	}
}
