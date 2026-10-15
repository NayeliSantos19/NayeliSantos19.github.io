const details={
 ritmo:{type:'PRODUCTIVIDAD / WEB',title:'Ritmo',intro:'Menos ruido, más enfoque. Una app para acompañar el hábito de estudiar.',problem:'Reunir el registro de estudio y los momentos de concentración en un espacio personal, accesible desde el navegador.',features:['Sesiones con tema, materia, minutos y notas.','Metas semanales y visualización del progreso.','Temporizador con pausa y modo inmersivo.','Duraciones sugeridas según la energía y datos guardados localmente.'],tags:['HTML','CSS','JavaScript','localStorage'],repo:'ritmo-study-app'},
 studyspot:{type:'COMUNIDAD ESTUDIANTIL / WEB',title:'StudySpot',intro:'Un lugar para descubrir dónde estudiar mejor en la universidad.',problem:'Hacer visibles las condiciones de los espacios de estudio a partir de información y reseñas de otros estudiantes.',features:['Explorar lugares y consultar sus detalles.','Filtrar por wifi, enchufes, silencio y tipo de espacio.','Registro de usuarios y publicación de reseñas.','Calificaciones promedio en las tarjetas de lugares.'],tags:['React','Supabase','Tailwind CSS'],repo:'studyspot'},
 bobinapp:{type:'GESTIÓN GANADERA / ANDROID + API',title:'Bobinapp',intro:'Información del hato disponible incluso cuando no hay señal.',problem:'Organizar los datos de ganado bovino en contextos de campo, con acceso local y sincronización cuando vuelve la conexión.',features:['Registros sin conexión y sincronización.','Trazabilidad y árbol genealógico.','Seguimiento de salud, reproducción y pesajes.','Panel de analíticas y alertas.'],tags:['Kotlin','Jetpack Compose','Room','Node.js','PostgreSQL'],repo:'bobinapp'}
};
const modal=document.getElementById('project-dialog');let opener;
document.querySelectorAll('[data-detail]').forEach(button=>button.addEventListener('click',()=>{
 const project=details[button.dataset.detail];opener=button;
 document.getElementById('detail-type').textContent=project.type;
 document.getElementById('detail-title').textContent=project.title;
 document.getElementById('detail-intro').textContent=project.intro;
 document.getElementById('detail-problem').textContent=project.problem;
 const features=document.getElementById('detail-features');features.replaceChildren(...project.features.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
 document.getElementById('detail-tags').replaceChildren(...project.tags.map(text=>{const span=document.createElement('span');span.textContent=text;return span;}));
 document.getElementById('detail-code').href=`https://github.com/NayeliSantos19/${project.repo}`;
 modal.showModal();
}));
document.getElementById('close-dialog').onclick=()=>modal.close();
modal.addEventListener('close',()=>opener?.focus());
modal.addEventListener('click',e=>{if(e.target!==modal)return;const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)modal.close();});
document.querySelectorAll('[data-filter]').forEach(button=>button.onclick=()=>{
 document.querySelectorAll('[data-filter]').forEach(b=>{const selected=b===button;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected));});
 let count=0;document.querySelectorAll('[data-category]').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;if(!card.hidden)count++;});
 document.getElementById('project-count').textContent=`${count} ${count===1?'proyecto':'proyectos'}`;
});
const palettes={lavanda:['#d5c4fb','#eee7fc','#f6eaff','#c7a5f0','#78629d'],lima:['#cbe6a0','#edf3e3','#f6ffe7','#bddc8e','#758f51'],coral:['#f0bda7','#f9ebe4','#fff1e7','#efb19c','#b37f6f']};
document.querySelectorAll('[data-color]').forEach(button=>button.onclick=()=>{
 ['--accent','--accent-light','--orb1','--orb2','--orb3'].forEach((key,i)=>document.documentElement.style.setProperty(key,palettes[button.dataset.color][i]));
 document.querySelectorAll('[data-color]').forEach(b=>{const selected=b===button;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected));});
});
document.getElementById('motion').onclick=e=>{const paused=document.body.classList.toggle('motion-paused');e.currentTarget.setAttribute('aria-pressed',String(paused));e.currentTarget.setAttribute('aria-label',paused?'Reanudar animaciones':'Pausar animaciones');e.currentTarget.textContent=paused?'▶':'Ⅱ';};
let scheduled=false;function progress(){const max=document.documentElement.scrollHeight-innerHeight;document.querySelector('.scroll-progress').style.transform=`scaleX(${max>0?Math.min(1,Math.max(0,scrollY/max)):0})`;scheduled=false;}
addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(progress);}},{passive:true});addEventListener('resize',progress);progress();
