const wheel = document.querySelector('.spin-wheel');
const spinBtn = document.querySelector('.spin-button');

const segments = 8;
const segmentAngle = 360 / segments;
const prizes = ["한잔더!", "꽝~다음기회에", "한잔더!", "꽝~다음기회에", "한잔더!", "꽝~다음기회에", "한잔더!", "꽝~다음기회에"];

for (let i = 0; i < segments; i++) {
    const segment = document.createElement('div');
    segment.classList.add('segment');

    const prizeText = document.createElement('span');
    prizeText.classList.add('prize');
    prizeText.textContent = prizes[i];

    // Position the text
    const angle = (i * segmentAngle) + (segmentAngle / 2);
    const x = 150 + 100 * Math.cos(angle * Math.PI / 180);
    const y = 150 + 100 * Math.sin(angle * Math.PI / 180);
    
    segment.style.left = `${x}px`;
    segment.style.top = `${y}px`;
    segment.style.transform = `translate(-50%, -50%) rotate(${angle + 90}deg)`;

    // Set text color based on segment color
    if (i % 2 === 0) {
        prizeText.classList.add('dark-text');
    } else {
        prizeText.classList.add('light-text');
    }

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

        if (winningPrize === "한잔더!") {
            alert("축하합니다!");
        }
    }, { once: true });
});
