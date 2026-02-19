class LottoBall extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const shadow = this.shadowRoot;
        shadow.innerHTML = ''; // 다시 렌더링하기 전에 기존 내용을 지웁니다.

        const number = this.getAttribute('number');
        const isDarkMode = document.body.classList.contains('dark-mode');

        const ball = document.createElement('div');
        ball.style.width = '60px';
        ball.style.height = '60px';
        ball.style.borderRadius = '50%';
        ball.style.border = `2px solid ${isDarkMode ? '#FFFFFF' : '#000000'}`;
        ball.style.display = 'flex';
        ball.style.justifyContent = 'center';
        ball.style.alignItems = 'center';
        ball.style.color = isDarkMode ? '#FFFFFF' : '#000000';
        ball.style.fontSize = '28px';
        ball.style.fontWeight = 'bold';
        ball.textContent = number;

        shadow.appendChild(ball);
    }
}

customElements.define('lotto-ball', LottoBall);

const numbersContainer = document.querySelector('.numbers-container');
const generateBtn = document.getElementById('generate-numbers-btn');

function generateLottoNumbers() {
    const numberRow = document.createElement('div');
    numberRow.classList.add('number-row');

    let generatedNumbers = new Set();
    while(generatedNumbers.size < 5) {
        generatedNumbers.add(Math.floor(Math.random() * 45) + 1);
    }

    generatedNumbers.forEach(number => {
        const lottoBall = document.createElement('lotto-ball');
        lottoBall.setAttribute('number', number);
        numberRow.appendChild(lottoBall);
    });

    numbersContainer.appendChild(numberRow);
}

generateBtn.addEventListener('click', generateLottoNumbers);

const themeSwitch = document.getElementById('checkbox');
themeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    
    // 모든 lotto-ball 요소들을 찾아서 다시 렌더링합니다.
    document.querySelectorAll('lotto-ball').forEach(ball => {
        ball.render();
    });
});

const showSongBtn = document.getElementById('show-song-btn');
const songContainer = document.getElementById('song-container');

showSongBtn.addEventListener('click', () => {
    if (songContainer.style.display === 'none') {
        songContainer.style.display = 'block';
    } else {
        songContainer.style.display = 'none';
    }
});
