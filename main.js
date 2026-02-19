document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-numbers-btn');
    const numbersContainer = document.querySelector('.numbers-container');
    const themeSwitch = document.getElementById('checkbox');
    const showSongBtn = document.getElementById('show-song-btn');
    const songContainer = document.getElementById('song-container');

    // Arched title effect
    const title = document.querySelector('.arched-title');
    if (title) {
        const text = title.innerText;
        title.innerHTML = '';
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.innerText = text[i];
            title.appendChild(span);
        }

        const arcValue = 50; // 아치 강도 조절 (클수록 완만)
        const radius = (title.offsetWidth * arcValue) / 180;

        const spans = title.querySelectorAll('span');
        const angleStep = 180 / (spans.length - 1);

        spans.forEach((span, i) => {
            const angle = (angleStep * i) - 90; // -90도부터 시작
            const x = radius * Math.cos(angle * (Math.PI / 180));
            const y = radius * Math.sin(angle * (Math.PI / 180));
            span.style.transform = `translate(${x}px, ${y}px) rotate(${angle + 90}deg)`;
        });
    }

    generateBtn.addEventListener('click', () => {
        generateNumbers();
    });

    themeSwitch.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode');
    });

    showSongBtn.addEventListener('click', function() {
        if (songContainer.style.display === 'none') {
            songContainer.style.display = 'block';
        } else {
            songContainer.style.display = 'none';
        }
    });

    function generateNumbers() {
        numbersContainer.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const numbers = getLottoNumbers();
            const row = document.createElement('div');
            row.classList.add('number-row');
            row.innerHTML = `<span>${numbers.join(', ')}</span>`;
            numbersContainer.appendChild(row);
        }
    }

    function getLottoNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNum = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNum);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }
});
