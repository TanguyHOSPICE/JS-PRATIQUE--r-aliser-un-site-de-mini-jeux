import { getRandomArbitrary } from '../Functions/barrelModule';

export { launchAnimationConfeti, stopAnimationConfeti } from '../Confettis/scriptConfettis.js';

function launchAnimationConfeti() {
	let animateDiv = document.createElement('div');
	animateDiv.id = 'allconfettis';
	animateDiv.innerHTML = '';

	for (let i = 0; i < 100; i++) {
		let confetti = document.createElement('div');
		confetti.classList.add('confetti');
		confetti.style.left = this.getRandomArbitrary(0, 100) + '%';
		confetti.style.animationDelay = 50 * i + 'ms';
		confetti.style.backgroundColor = '#' + ((Math.random() * 0xffffff) << 0).toString(16);
		animateDiv.appendChild(confeti);
	}

	document.body.appendChild(animateDiv);
}

function stopAnimationConfeti() {
	let animateDiv = document.getElementById('allConfettis');
	if (animateDiv != undefined) {
		animateDiv.innerHTML = '';
		animateDiv.remove();
	}
}

getRandomArbitrary();
