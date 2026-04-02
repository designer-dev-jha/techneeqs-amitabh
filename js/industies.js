function toggleTheme(){
  const h=document.documentElement;
  const t=h.getAttribute('data-theme')==='dark'?'light':'dark';
  h.setAttribute('data-theme',t);
  localStorage.setItem('tn-theme',t);
}
(function(){const s=localStorage.getItem('tn-theme');if(s)document.documentElement.setAttribute('data-theme',s);})();

function toggleMenu(){document.getElementById('mobMenu').classList.toggle('open');}

function switchTab(idx){
  document.querySelectorAll('.ind-tab').forEach((t,i)=>t.classList.toggle('active',i===idx));
  document.querySelectorAll('.ind-panel').forEach(p=>p.classList.remove('active'));
  document.querySelector(`.ind-panel[data-panel="${idx}"]`).classList.add('active');
}

function toggleMob(hd){hd.parentElement.classList.toggle('open');}

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href');
    if(id.length>1&&document.querySelector(id)){
      e.preventDefault();
      document.querySelector(id).scrollIntoView({behavior:'smooth'});
      document.getElementById('mobMenu').classList.remove('open');
    }
  });
});

// Init Swiper footer slider if available
document.addEventListener('DOMContentLoaded',function(){
  if(typeof Swiper !== 'undefined'){
    new Swiper('.footerslide',{
      loop:true,
      autoplay:{delay:3500,disableOnInteraction:false},
      speed:800,
      effect:'fade',
      fadeEffect:{crossFade:true}
    });
  }
});

