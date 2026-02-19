class LottoBall extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const shadow = this.shadowRoot;
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
    let generatedNumbers = new Set();
    numbersContainer.innerHTML = ''; 

    while(generatedNumbers.size < 5) {
        generatedNumbers.add(Math.floor(Math.random() * 45) + 1);
    }

    generatedNumbers.forEach(number => {
        const lottoBall = document.createElement('lotto-ball');
        lottoBall.setAttribute('number', number);
        numbersContainer.appendChild(lottoBall);
    });
}

generateBtn.addEventListener('click', generateLottoNumbers);

const themeSwitch = document.getElementById('checkbox');
themeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    // 테마 변경 시, 생성되어 있는 로또 볼들의 색상을 다시 렌더링하기 위해 함수 호출
    if (numbersContainer.hasChildNodes()) {
        generateLottoNumbers();
    }
});
