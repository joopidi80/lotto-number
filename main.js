document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-numbers-btn');
    const numbersContainer = document.querySelector('.numbers-container');
    const themeSwitch = document.getElementById('checkbox');
    const showSongBtn = document.getElementById('show-song-btn');
    const songContainer = document.getElementById('song-container');

    // Arched title effect with CircleType.js
    const title = document.querySelector('.arched-title');
    if (title) {
        const circleType = new CircleType(title);
        circleType.radius(200).dir(-1);
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
