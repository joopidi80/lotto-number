const canvas = document.getElementById('wheel-canvas');
const ctx = canvas.getContext('2d');
const spinBtn = document.querySelector('.spin-button');

const segments = [
    { color: '#FFD700', label: '100' },
    { color: '#FF6347', label: '200' },
    { color: '#ADFF2F', label: '300' },
    { color: '#40E0D0', label: '400' },
    { color: '#EE82EE', label: '500' },
    { color: '#BA55D3', label: '600' },
    { color: '#1E90FF', label: '700' },
    { color: '#FF4500', label: '800' },
];

const numSegments = segments.length;
const angleStep = (2 * Math.PI) / numSegments;

function drawWheel() {
    segments.forEach((segment, i) => {
        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.arc(200, 200, 200, i * angleStep, (i + 1) * angleStep);
        ctx.fillStyle = segment.color;
        ctx.fill();
        ctx.save();
        ctx.translate(200, 200);
        ctx.rotate(i * angleStep + angleStep / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#000';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(segment.label, 180, 10);
        ctx.restore();
    });
}

let currentAngle = 0;
let spinAngleStart = 0;
let spinTime = 0;
let spinTimeTotal = 0;

function rotateWheel() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    currentAngle += (spinAngle * Math.PI) / 180;
    ctx.clearRect(0, 0, 400, 400);
    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate(currentAngle);
    ctx.translate(-200, -200);
    drawWheel();
    ctx.restore();

    requestAnimationFrame(rotateWheel);
}

function stopRotateWheel() {
    const degrees = (currentAngle * 180) / Math.PI + 90;
    const arcd = (angleStep * 180) / Math.PI;
    const index = Math.floor((360 - (degrees % 360)) / arcd);
    ctx.save();
    ctx.font = 'bold 40px Arial';
    const text = segments[index].label;
    ctx.fillText(text, 200 - ctx.measureText(text).width / 2, 250);
    ctx.restore();
    spinBtn.disabled = false;
}

function easeOut(t, b, c, d) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}

spinBtn.addEventListener('click', () => {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3000 + 4000;
    rotateWheel();
    spinBtn.disabled = true;
});

drawWheel();
