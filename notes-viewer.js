const noteButtons = [...document.querySelectorAll('.note-image')];
const viewer = document.querySelector('#notesViewer');
const viewerImage = document.querySelector('#viewerImage');
const viewerCaption = document.querySelector('#viewerCaption');
const closeViewer = document.querySelector('#closeNotesViewer');
const previous = document.querySelector('#previousNote');
const next = document.querySelector('#nextNote');
let current = 0;

function showNote(index) {
  current = (index + noteButtons.length) % noteButtons.length;
  const image = noteButtons[current].querySelector('img');
  viewerImage.src = image.currentSrc || image.src;
  viewerImage.alt = image.alt;
  viewerCaption.textContent = `${image.alt} · ${current + 1} de ${noteButtons.length}`;
  viewer.hidden = false;
  document.body.style.overflow = 'hidden';
  closeViewer.focus();
}

function hideViewer() {
  viewer.hidden = true;
  document.body.style.overflow = '';
  noteButtons[current]?.focus();
}

noteButtons.forEach((button, index) => button.addEventListener('click', () => showNote(index)));
closeViewer.addEventListener('click', hideViewer);
previous.addEventListener('click', () => showNote(current - 1));
next.addEventListener('click', () => showNote(current + 1));
viewer.addEventListener('click', event => { if (event.target === viewer) hideViewer(); });
document.addEventListener('keydown', event => {
  if (viewer.hidden) return;
  if (event.key === 'Escape') hideViewer();
  if (event.key === 'ArrowLeft') showNote(current - 1);
  if (event.key === 'ArrowRight') showNote(current + 1);
});
