{
  const route = document.getElementById('mascot-route');
  const button = document.getElementById('mascot-button');
  const image = document.getElementById('mascot-image');
  const message = document.getElementById('mascot-message');
  const motionControl = document.getElementById('motion');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const still = 'assets/mascot-still.png';
  const walking = 'assets/mascot-walk.gif';

  function syncMascot() {
    const paused = reducedMotion.matches
      || document.body.classList.contains('motion-paused')
      || !message.hidden;
    const nextImage = paused ? still : walking;
    if (image.getAttribute('src') !== nextImage) image.src = nextImage;
  }

  function showGreeting(open) {
    if (open) {
      const buttonBounds = button.getBoundingClientRect();
      const nearRightEdge = buttonBounds.left + 160 > innerWidth;
      message.style.left = nearRightEdge ? 'auto' : '0';
      message.style.right = nearRightEdge ? '0' : 'auto';
    }
    route.classList.toggle('is-greeting', open);
    message.hidden = !open;
    button.setAttribute('aria-expanded', String(open));
    syncMascot();
  }

  button.addEventListener('click', () => showGreeting(message.hidden));
  button.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !message.hidden) showGreeting(false);
  });
  window.addEventListener('resize', () => {
    if (!message.hidden) showGreeting(false);
  });
  motionControl.addEventListener('click', syncMascot);
  reducedMotion.addEventListener('change', syncMascot);
  route.hidden = false;
  syncMascot();
}
