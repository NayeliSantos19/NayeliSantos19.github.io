
const previousSections = {
  "proyectos": "proyectos.html",
  "caso-ritmo": "ritmo.html",
  "sobre-mi": "sobre-mi.html",
  "habilidades": "sobre-mi.html#habilidades",
  "contacto": "contacto.html"
};
function followPreviousSection() {
  if (!['', 'index.html'].includes(location.pathname.split('/').pop())) return;
  const section = location.hash.slice(1);
  if (Object.hasOwn(previousSections, section)) location.replace(previousSections[section]);
}
addEventListener('hashchange', followPreviousSection);
followPreviousSection();

const motionButton = document.getElementById('motion');
if (motionButton) motionButton.onclick=e=>{const paused=document.body.classList.toggle('motion-paused');e.currentTarget.setAttribute('aria-pressed',String(paused));e.currentTarget.setAttribute('aria-label',paused?'Reanudar animaciones':'Pausar animaciones');e.currentTarget.textContent=paused?'▶':'Ⅱ';};
let scheduled=false;function progress(){const max=document.documentElement.scrollHeight-innerHeight;document.querySelector('.scroll-progress').style.transform=`scaleX(${max>0?Math.min(1,Math.max(0,scrollY/max)):0})`;scheduled=false;}
addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(progress);}},{passive:true});addEventListener('resize',progress);progress();
