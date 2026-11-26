{
  const route = document.getElementById('mascot-route');
  const button = document.getElementById('mascot-button');
  const image = document.getElementById('mascot-image');
  const message = document.getElementById('mascot-message');
  const motionControl = document.getElementById('home-motion');
  let motionEnabled = true;
  let factIndex = 0;
  let dismissTimer;
  const facts = [
    '🎓 Estudio Ingeniería en Desarrollo de Software en la UES, Chalatenango.',
    '☕ He creado APIs REST con Java y Spring Boot.',
    '💾 He diseñado bases de datos con Oracle XE.',
    '⏱️ Ritmo es mi proyecto para organizar sesiones de estudio.',
    '🐄 BobinApp me permitió explorar cómo aplicar la tecnología a la ganadería.'
  ];
  const still = 'assets/mascot-still.png';
  const walking = 'assets/mascot-walk.gif';

  function syncMascot() {
    const enabled = motionEnabled;
    document.body.classList.toggle('motion-paused', !enabled);
    document.body.classList.toggle('motion-opt-in', enabled);
    motionControl.textContent = enabled ? 'Pausar animación' : 'Activar animación';
    const nextImage = enabled && !route.classList.contains('is-greeting') ? walking : still;
    if (image.getAttribute('src') !== nextImage) image.src = nextImage;
  }

  function hideFact() {
    clearTimeout(dismissTimer);
    route.classList.remove('is-greeting');
    message.textContent = '';
    button.setAttribute('aria-expanded', 'false');
    syncMascot();
  }

  function showFact() {
    clearTimeout(dismissTimer);
    route.classList.add('is-greeting');
    const bounds = button.getBoundingClientRect();
    const width = Math.min(224, innerWidth - 24);
    const left = Math.max(12, Math.min(bounds.left, innerWidth - width - 12));
    message.style.width = `${width}px`;
    message.style.left = `${left - bounds.left}px`;
    message.classList.toggle('below', bounds.top < 120);
    message.textContent = facts[factIndex];
    factIndex = (factIndex + 1) % facts.length;
    button.setAttribute('aria-expanded', 'true');
    syncMascot();
    dismissTimer = setTimeout(hideFact, 5200);
  }

  button.addEventListener('click', showFact);
  button.addEventListener('keydown', event => {
    if (event.key === 'Escape') hideFact();
  });
  window.addEventListener('resize', hideFact);
  motionControl.addEventListener('click', () => {
    motionEnabled = !motionEnabled;
    syncMascot();
  });
  motionControl.hidden = false;
  route.hidden = false;
  syncMascot();
}
