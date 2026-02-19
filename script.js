const wheel = document.querySelector('.spin-wheel');
const spinBtn = document.querySelector('.spin-button');

const segments = 8;
const segmentAngle = 360 / segments;

for (let i = 0; i < segments; i++) {
    const segment = document.createElement('div');
    segment.classList.add('segment');
    segment.style.transform = `rotate(${i * segmentAngle}deg)`;
    wheel.appendChild(segment);
}

spinBtn.addEventListener('click', () => {
    const randomRotation = Math.floor(Math.random() * 360) + 720; // Spin at least twice
    wheel.style.transform = `rotate(${randomRotation}deg)`;
});
