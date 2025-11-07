function qs(sel){ return document.querySelector(sel) }
function qsa(sel){ return Array.from(document.querySelectorAll(sel)) }

/* Apply saved theme globally */
(function applyTheme() {
  const saved = localStorage.getItem('najaf-theme');
  document.body.classList.remove('theme-light', 'theme-dark');
  document.body.classList.add(saved === 'light' ? 'theme-light' : 'theme-dark');
})();

/* Enable theme toggle globally */
document.addEventListener('DOMContentLoaded', () => {
  const toggle = qs('#theme-toggle');
  if(toggle){
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('theme-light');
      document.body.classList.toggle('theme-dark');
      localStorage.setItem('najaf-theme', document.body.classList.contains('theme-light') ? 'light' : 'dark');
    });
  }

  // Clock (available on all pages)
  const clock = qs('#mini-clock');
  if(clock){
    setInterval(()=>{
      const d=new Date();
      clock.textContent=`${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`;
    },1000);
  }
});

/* ------- Home Page ------- */
function initHome(){
  const sessionEl = qs('#session-time');
  let sec = 0;
  setInterval(()=>{ sec++; sessionEl.textContent = `${sec}s`; },1000);
}

/* ------- Skills Page ------- */
function initSkills(){
  qsa('.progress').forEach(el => {
    const val = Number(el.dataset.value || 0);
    const bar = el.querySelector('.progress-bar');
    setTimeout(()=> bar.style.width = val + '%', 150);
  });
}

/* ------- Projects Page ------- */
function initProjects(){
  const select = qs('#tech-filter');
  const cards = qsa('.project-card');
  function filter(){
    const val = select.value;
    cards.forEach(c=>{
      const techs = (c.dataset.tech || '').split(',').map(t=>t.trim().toLowerCase());
      c.style.display = (val==='all'||techs.includes(val)) ? '' : 'none';
    });
  }
  select.addEventListener('change', filter);
  filter();
}

wi
