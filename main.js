class LottoBall extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const shadow = this.shadowRoot;
        const number = this.getAttribute('number');
        const color = this.getColorForNumber(parseInt(number));

        const ball = document.createElement('div');
        ball.style.width = '60px';
        ball.style.height = '60px';
        ball.style.borderRadius = '50%';
        ball.style.background = color;
        ball.style.display = 'flex';
        ball.style.justifyContent = 'center';
        ball.style.alignItems = 'center';
        ball.style.color = 'white';
        ball.style.fontSize = '28px';
        ball.style.fontWeight = 'bold';
        ball.style.textShadow = '1px 1px 2px rgba(0,0,0,0.2)';
        ball.style.boxShadow = `0 0 15px ${color}, 0 0 25px rgba(255,255,255,0.5) inset`;
        ball.textContent = number;

        shadow.appendChild(ball);
    }

    getColorForNumber(number) {
        if (number <= 10) return '#f2b705'; // 노란색
        if (number <= 20) return '#1e90ff'; // 파란색
        if (number <= 30) return '#ff4500'; // 빨간색
        if (number <= 40) return '#808080'; // 회색
        return '#2ed573'; // 녹색
    }
}

customElements.define('lotto-ball', LottoBall);

document.getElementById('generate-btn').addEventListener('click', () => {
    const numbersContainer = document.querySelector('.numbers-container');
    numbersContainer.innerHTML = ''; // 이전 번호 삭제

    const numbers = new Set();
    while(numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    numbers.forEach(number => {
        const lottoBall = document.createElement('lotto-ball');
        lottoBall.setAttribute('number', number);
        numbersContainer.appendChild(lottoBall);
    });
});

const themeSwitch = document.getElementById('checkbox');
themeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});
