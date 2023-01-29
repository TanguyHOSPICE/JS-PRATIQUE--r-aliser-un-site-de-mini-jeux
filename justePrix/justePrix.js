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

function launchGame() {
	timeStamp = 30;
	if (counterInterval != null) {
		clearInterval(counterInterval);
	}

	counterInterval = setInterval(() => {
		countdownDiv.innerHTML = timeStamp + ' seconde(s)';
		timeStamp--;

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
			// endGame(false);
		}
	}, 1000);
}
