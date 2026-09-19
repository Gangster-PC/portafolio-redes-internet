const lines = [
  ['Verso I', 'Todo empezó en la UCLA con un destello digital,'], ['','el sesenta y nueve vio un mensaje casi sin terminar.'], ['','Apenas dos letras, "L" y "O", cruzaron la línea y el papel,'], ['','las redes abrieron sus alas en el viejo ARPANET.'], ['','Werner Herzog lo miró en su lente y descubrió'], ['','cómo un cable distante la historia humana transformó:'], ['','pasamos de nodos aislados a un pulso mundial,'], ['','un sistema nervioso de alcance global.'],
  ['Coro', 'Y así cambió el mundo, la forma de hablar,'], ['','de estudiar, de trabajar y de volver a empezar.'], ['','La evolución del Internet nos trajo la luz,'], ['','aunque a veces las sombras pesen como una cruz.'], ['','Hay más oportunidades que riesgo al final,'], ['','si guiamos con ética este viaje virtual.'],
  ['Verso II', 'La comunicación quebró las barreras del mapa y la voz,'], ['','en proyectos como Foldit curamos la ciencia entre dos.'], ['','Mentes unidas a miles de millas creando solución,'], ['','democratizando el saber en cada rincón.'], ['','Pero el documental también muestra la grieta del dolor:'], ['','el ciberacoso, la adicción y el silencio alrededor,'], ['','pantallas brillantes donde el alma se suele aislar,'], ['','recordándonos que el exceso nos puede cegar.'],
  ['Verso III', 'El impacto en la sociedad es un gran espejo en la red,'], ['','refleja lo mejor y el peligro de no tener sed'], ['','de justicia, de normas y de ciberseguridad,'], ['','frente al riesgo latente de un apagón de verdad.'], ['','La red no es la mala, es el uso que da el corazón:'], ['','entre medicina remota y la automatización,'], ['','las puertas que abre la ciencia superan el mal,'], ['','llevando al ser humano a un nivel sin igual.'],
  ['Coro', 'Y así cambió el mundo, la forma de hablar,'], ['','de estudiar, de trabajar y de volver a empezar.'], ['','La evolución del Internet nos trajo la luz,'], ['','aunque a veces las sombras pesen como una cruz.'], ['','Hay más oportunidades que riesgo al final,'], ['','si guiamos con ética este viaje virtual.'],
  ['Puente', 'De aquel pequeño "LO" a la inteligencia artificial,'], ['','tejimos una trama de alcance cósmico y global.'], ['','El desafío está servido en nuestra realidad:'], ['','cuidar la conexión sin perder la humanidad.'],
  ['Outro', 'Un pulso de datos, una chispa de unión,'], ['','así se sintetiza nuestra gran evolución.'], ['','Más luces que sombras en este caminar,'], ['','el futuro en la red acaba de comenzar.']
];

const audio = document.querySelector('#audio');
const play = document.querySelector('#play');
const progress = document.querySelector('#progress');
const elapsed = document.querySelector('#elapsed');
const total = document.querySelector('#total');
const lyricBox = document.querySelector('#lyrics');

lyricBox.innerHTML = lines.map(([section, text]) => `${section ? `<p class="section-name">${section}</p>` : ''}<p class="line">${text}</p>`).join('');
const time = value => `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, '0')}`;

function updateProgress() {
  elapsed.textContent = time(audio.currentTime);
  progress.value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
}

audio.addEventListener('loadedmetadata', () => {
  total.textContent = time(audio.duration);
  updateProgress();
});
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('play', () => {
  play.textContent = 'Ⅱ';
  play.setAttribute('aria-label', 'Pausar canción');
});
audio.addEventListener('pause', () => {
  play.textContent = '▶';
  play.setAttribute('aria-label', 'Reproducir canción');
});
audio.addEventListener('ended', updateProgress);
play.addEventListener('click', () => { audio.paused ? audio.play() : audio.pause(); });
progress.addEventListener('input', () => {
  if (audio.duration) audio.currentTime = (progress.value / 100) * audio.duration;
});
