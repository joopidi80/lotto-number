const wheel = document.querySelector('.spin-wheel');
const spinBtn = document.querySelector('.spin-button');

const segments = 8;
const segmentAngle = 360 / segments;
const prizes = ["커피1잔", "꽝", "커피1잔", "꽝", "커피1잔", "꽝", "커피1잔", "꽝"];


for (let i = 0; i < segments; i++) {
    const segment = document.createElement('div');
    segment.classList.add('segment');
    segment.style.transform = `rotate(${i * segmentAngle}deg)`;
    
    const prizeText = document.createElement('span');
    prizeText.classList.add('prize');
    prizeText.textContent = prizes[i];
    
    segment.appendChild(prizeText);
    wheel.appendChild(segment);
}

spinBtn.addEventListener('click', () => {
    const randomRotation = Math.floor(Math.random() * 360) + 3600; // Spin at least 10 times
    wheel.style.transform = `rotate(${randomRotation}deg)`;

    wheel.addEventListener('transitionend', () => {
        const finalRotation = randomRotation % 360;
        const winningSegmentIndex = Math.floor((360 - finalRotation + segmentAngle / 2) % 360 / segmentAngle);
        const winningPrize = prizes[winningSegmentIndex];

        if (winningPrize === "커피1잔") {
            alert("축하합니다!");
        }
    }, { once: true });
});
