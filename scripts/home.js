{
  const route = document.getElementById('mascot-route');
  const button = document.getElementById('mascot-button');
  const image = document.getElementById('mascot-image');
  const message = document.getElementById('mascot-message');
  const motionControl = document.getElementById('home-motion');
  const hero = document.getElementById('hero-mini');
  let motionOverride;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const still = 'assets/mascot-still.png';
  const walking = 'assets/mascot-walk.gif';

  function syncMascot() {
    const enabled = motionOverride ?? !reducedMotion.matches;
    document.body.classList.toggle('motion-paused', !enabled);
    document.body.classList.toggle('motion-opt-in', motionOverride === true);
    motionControl.textContent = enabled ? 'Pausar animación' : 'Activar animación';
    const heroImage = enabled ? walking : still;
    if (hero.getAttribute('src') !== heroImage) hero.src = heroImage;
    const nextImage = enabled && message.hidden ? walking : still;
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
  motionControl.addEventListener('click', () => {
    motionOverride = !(motionOverride ?? !reducedMotion.matches);
    syncMascot();
  });
  motionControl.hidden = false;
  reducedMotion.addEventListener('change', syncMascot);
  route.hidden = false;
  syncMascot();
}
