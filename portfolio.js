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
modal.addEventListener('close', () => {
 const visibleOpener = opener && !opener.closest('[hidden]') ? opener : document.getElementById('quick-open');
 visibleOpener?.focus();
});
modal.addEventListener('click',e=>{if(e.target!==modal)return;const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)modal.close();});
document.querySelectorAll('[data-filter]').forEach(button=>button.onclick=()=>{
 document.querySelectorAll('[data-filter]').forEach(b=>{const selected=b===button;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected));});
 let count=0;document.querySelectorAll('[data-category]').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;if(!card.hidden)count++;});
 document.getElementById('project-count').textContent=`${count} ${count===1?'proyecto':'proyectos'}`;
});

const requestedProject = new URLSearchParams(location.search).get('proyecto');
const requestedButton = [...document.querySelectorAll('[data-detail]')]
  .find(button => button.dataset.detail === requestedProject);
if (requestedButton) addEventListener('DOMContentLoaded', () => requestedButton.click(), { once: true });
