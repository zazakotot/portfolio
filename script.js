document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click',e=>{
    const target=document.querySelector(link.getAttribute('href'));
    if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'});}
  });
});

const play=document.querySelector('.play');
play?.addEventListener('click',()=>{
  play.classList.toggle('active');
  play.innerHTML=play.classList.contains('active') ? '<span>Ⅱ</span>' : '<span>▶</span>';
});

const revealTargets=document.querySelectorAll(
  '.section-head,.project,.about-layout,.contact-content,.contact-grid,.hero-copy,.hero-visual,footer'
);
revealTargets.forEach(el=>el.classList.add('reveal'));

const observer=new IntersectionObserver(entries=>{
  entries.forEach((entry,i)=>{
    if(entry.isIntersecting){
      entry.target.style.transitionDelay=(Math.min(i%4,3)*90)+'ms';
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
revealTargets.forEach(el=>observer.observe(el));

if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
  document.querySelectorAll('.project-media').forEach(media=>{
    media.addEventListener('mousemove',e=>{
      const r=media.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      media.style.transform=`scale(.975) translate(${x*5}px,${y*5}px)`;
    });
    media.addEventListener('mouseleave',()=>{
      media.style.transform='';
    });
  });
}

window.addEventListener('scroll',()=>{
  const header=document.querySelector('.header');
  if(window.scrollY>30) header.style.boxShadow='0 12px 35px #0005';
  else header.style.boxShadow='none';
});
