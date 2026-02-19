
let scene, camera, renderer;
let stars = [];
let bigBangPower = 0;

init();
animate();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
    );
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 🌌 Nebula 배경
    const nebulaTexture = new THREE.TextureLoader().load(
        "https://threejs.org/examples/textures/nebula.jpg"
    );
    const nebulaGeometry = new THREE.SphereGeometry(1000, 64, 64);
    const nebulaMaterial = new THREE.MeshBasicMaterial({
        map: nebulaTexture,
        side: THREE.BackSide
    });
    const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
    scene.add(nebula);

    // ⭐ 별 생성
    const starGeometry = new THREE.SphereGeometry(0.05, 8, 8);

    for (let i = 0; i < 1500; i++) {
        const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color(`hsl(${Math.random()*360},100%,80%)`)
        });

        const star = new THREE.Mesh(starGeometry, material);

        star.position.set(0, 0, 0);
        star.userData = {
            direction: new THREE.Vector3(
                (Math.random()-0.5),
                (Math.random()-0.5),
                (Math.random()-0.5)
            ).normalize(),
            speed: Math.random() * 0.02 + 0.01
        };

        scene.add(star);
        stars.push(star);
    }

    window.addEventListener("click", () => {
        bigBangPower = 0.3; // 빅뱅 가속
    });

    window.addEventListener("resize", onResize);
}

function animate() {
    requestAnimationFrame(animate);

    stars.forEach(star => {

        // 빅뱅 가속 감소
        let speedBoost = bigBangPower;

        star.position.add(
            star.userData.direction.clone().multiplyScalar(star.userData.speed + speedBoost)
        );

        // 점점 커지는 효과
        star.scale.multiplyScalar(1.002);

        // 색 변화 (은하 효과)
        let hue = (Date.now() * 0.02) % 360;
        star.material.color.setHSL(hue/360, 1, 0.7);

        // 너무 멀어지면 리셋
        if (star.position.length() > 200) {
            star.position.set(0,0,0);
            star.scale.set(1,1,1);
        }
    });

    bigBangPower *= 0.95; // 점점 감소

    renderer.render(scene, camera);
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
