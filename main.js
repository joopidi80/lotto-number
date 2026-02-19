
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

        const style = document.createElement('style');
        style.textContent = `
            :host {
                transform-style: preserve-3d;
                perspective: 1000px;
            }
            div {
                transition: transform 0.5s;
            }
            div:hover {
                transform: translateZ(10px) scale(1.1);
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(ball);
    }

    getColorForNumber(number) {
        if (number <= 10) return 'linear-gradient(135deg,rgb(99, 26, 50), #FFC371)'; // Red/Orange
        if (number <= 20) return 'linear-gradient(135deg, #FF4B2B, #FF416C)'; // Orange/Pink
        if (number <= 30) return 'linear-gradient(135deg, #a8ff78, #78ffd6)'; // Green/Teal
        if (number <= 40) return 'linear-gradient(135deg, #2193b0, #6dd5ed)'; // Blue
        return 'linear-gradient(135deg, #cc2b5e, #753a88)'; // Purple/Pink
    }
}

customElements.define('lotto-ball', LottoBall);


document.getElementById('generate-btn').addEventListener('click', () => {
    const numbersContainer = document.querySelector('.numbers-container');
    numbersContainer.innerHTML = '';

    const numbers = new Set();
    while(numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    let delay = 0;
    for (const number of Array.from(numbers).sort((a,b) => a-b)) {
        setTimeout(() => {
            const lottoBall = document.createElement('lotto-ball');
            lottoBall.setAttribute('number', number);
            numbersContainer.appendChild(lottoBall);
        }, delay);
        delay += 100;
    }
});
