const stage = document.querySelector('#galaxyStage');
const configs = [
  ['node1', 180, 125, .0006, 0], ['node2', 260, 150, .00045, .8], ['node3', 335, 175, .00035, 1.6], ['node4', 225, 115, .0005, 2.4],
  ['node5', 370, 190, .00028, 3.2], ['node6', 300, 150, .0004, 4], ['node7', 205, 110, .00055, 4.8], ['node8', 400, 200, .00025, 5.6]
].map(([id, rx, ry, speed, angle]) => ({ id, rx, ry, speed, angle }));
let orbitPaused = false;
configs.forEach(config => { const node = document.querySelector(`#${config.id}`); node?.addEventListener('mouseenter', () => { orbitPaused = true; }); node?.addEventListener('mouseleave', () => { orbitPaused = false; }); node?.addEventListener('focus', () => { orbitPaused = true; }); node?.addEventListener('blur', () => { orbitPaused = false; }); });
function animateOrbit() {
  if (stage) {
    const rect = stage.getBoundingClientRect();
    const scale = Math.min(1, rect.width / 900);
    configs.forEach(config => { const node = document.querySelector(`#${config.id}`); if (!node) return; if (!orbitPaused) config.angle += config.speed; node.style.left = `${rect.width / 2 + Math.cos(config.angle) * config.rx * scale}px`; node.style.top = `${rect.height / 2 + Math.sin(config.angle) * config.ry * scale}px`; });
  }
  requestAnimationFrame(animateOrbit);
}
animateOrbit();

const canvas = document.querySelector('#starfield');
const context = canvas?.getContext('2d');
const stars = [];
function resizeStars() { if (!canvas) return; canvas.width = innerWidth; canvas.height = innerHeight; }
resizeStars(); window.addEventListener('resize', resizeStars);
if (context) {
  for (let i = 0; i < 180; i += 1) stars.push({ x: Math.random(), y: Math.random(), size: Math.random() * 1.6 + .4, alpha: Math.random() * .7 + .2, direction: Math.random() > .5 ? 1 : -1 });
  function renderStars() { context.clearRect(0, 0, canvas.width, canvas.height); stars.forEach(star => { star.alpha += .004 * star.direction; if (star.alpha > .9 || star.alpha < .18) star.direction *= -1; context.beginPath(); context.arc(star.x * canvas.width, star.y * canvas.height, star.size, 0, Math.PI * 2); context.fillStyle = `rgba(255,255,255,${star.alpha})`; context.fill(); }); requestAnimationFrame(renderStars); }
  renderStars();
}

const phrases = ['Analiza como un ingeniero de sistemas...', '8 premisas · 8 productos multimodales', 'Topologías · protocolos · medios · arquitectura OSI', 'Haz clic en cualquier nodo para abrir su evidencia.'];
const typewriter = document.querySelector('#typewriterText'); let phrase = 0; let character = 0; let deleting = false;
function typeLoop() { if (!typewriter) return; const current = phrases[phrase]; typewriter.textContent = deleting ? current.slice(0, character - 1) : current.slice(0, character + 1); character += deleting ? -1 : 1; let delay = deleting ? 28 : 55; if (!deleting && character === current.length) { deleting = true; delay = 1800; } else if (deleting && character === 0) { deleting = false; phrase = (phrase + 1) % phrases.length; delay = 450; } setTimeout(typeLoop, delay); }
typeLoop();
