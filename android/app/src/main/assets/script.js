// --- Matrix Rain Background Animation ---
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const letters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$@&*%';
const fontSize = 12;
let columns = canvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(5, 8, 17, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff66';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
setInterval(drawMatrix, 33);


// --- Animated RGB Orbiting Ball around Main Panel ---
const panel = document.getElementById('mainPanel');
const ball = document.getElementById('orbitBall');
const rgbColors = ['#00f3ff', '#ff007f', '#7000ff', '#00ff66', '#ff3300'];
let colorIndex = 0;
let angle = 0;

function animateOrbit() {
    const width = panel.offsetWidth;
    const height = panel.offsetHeight;
    const perimeter = 2 * (width + height);
    
    let dist = (angle * perimeter / 360) % perimeter;
    let x = 0, y = 0;

    if (dist < width) {
        x = dist;
        y = 0;
    } else if (dist < width + height) {
        x = width;
        y = dist - width;
    } else if (dist < 2 * width + height) {
        x = width - (dist - width - height);
        y = height;
    } else {
        x = 0;
        y = height - (dist - 2 * width - height);
    }

    ball.style.left = (x - 8) + 'px';
    ball.style.top = (y - 8) + 'px';
    ball.style.boxShadow = `0 0 15px ${rgbColors[colorIndex]}, 0 0 25px ${rgbColors[(colorIndex + 1) % rgbColors.length]}`;

    angle = (angle + 2) % 360;
    if (angle % 20 === 0) {
        colorIndex = (colorIndex + 1) % rgbColors.length;
    }

    requestAnimationFrame(animateOrbit);
}
requestAnimationFrame(animateOrbit);


// --- Node Modal Popup Interactions ---
function toggleNodePopup() {
    const modal = document.getElementById('nodeModal');
    modal.style.display = 'flex';
}

function selectNode(nodeName) {
    document.getElementById('selectedNodeText').innerText = nodeName;
    document.getElementById('nodeModal').style.display = 'none';
}

// Close modal if clicked outside content
window.onclick = function(event) {
    const modal = document.getElementById('nodeModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}


// --- Generate Key Action & Verification Sequence ---
function handleGenerateKey() {
    const btn = document.getElementById('generateBtn');
    
    btn.innerText = "VERIFYING (3s)...";
    btn.style.color = "#ff007f";
    
    setTimeout(() => {
        btn.innerText = "VERIFYING (2s)...";
        btn.style.color = "#00ff66";
    }, 1000);

    setTimeout(() => {
        btn.innerText = "ACCESS GRANTED!";
        btn.style.color = "#00f3ff";
    }, 2000);

    setTimeout(() => {
        window.open("https://viku.urlking.in/blacky001", "_blank");
        btn.innerText = "GENERATE KEY";
        btn.style.color = "#00f3ff";
    }, 3000);
}
