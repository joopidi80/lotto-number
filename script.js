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
    const randomRotation = Math.floor(Math.random() * 360) + 720; // Spin at least twice
    wheel.style.transform = `rotate(${randomRotation}deg)`;
});
