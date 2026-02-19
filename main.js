document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-numbers-btn');
    const numbersContainer = document.querySelector('.numbers-container');
    const themeSwitch = document.getElementById('checkbox');
    const showSongBtn = document.getElementById('show-song-btn');
    const songContainer = document.getElementById('song-container');

    // 아치형 제목 효과 초기화
    const title = document.querySelector('.arched-title');
    if (title) {
        const circleType = new CircleType(title);
        circleType.radius(200).dir(-1);
    }

    // 행운 번호 뽑기 버튼 이벤트 리스너
    generateBtn.addEventListener('click', () => {
        generateNumbers();
    });

    // 테마 전환 스위치 이벤트 리스너
    themeSwitch.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode');
    });

    // 노래 추천 버튼 이벤트 리스너
    showSongBtn.addEventListener('click', function() {
        if (songContainer.style.display === 'none') {
            songContainer.style.display = 'block';
        } else {
            songContainer.style.display = 'none';
        }
    });

    // 로또 번호 생성 및 표시 함수
    function generateNumbers() {
        numbersContainer.innerHTML = ''; // 기존 번호 삭제
        for (let i = 0; i < 5; i++) {
            const numbers = getLottoNumbers();
            const row = document.createElement('div');
            row.classList.add('number-row');
            row.innerHTML = `<span>${numbers.join(', ')}</span>`;
            numbersContainer.appendChild(row);
        }
    }

    // 6개의 유니크한 로또 번호를 생성하는 함수
    function getLottoNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNum = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNum);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }
});
