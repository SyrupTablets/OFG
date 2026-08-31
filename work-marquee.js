window.setTimeout(() => {
  const works = ['Bacteria.jpg','Bowel Disease.jpg','Brain Vessel.jpg','Butterfly.jpg','DUX4.jpg','Eye operation.jpg','Flight Post.jpg','Forest.jpg','Gene.jpg','Golf.jpg','Gravitational wave 1.jpg','Gravitational wave 2.jpg','Hear and brain.jpg','Infant Post.jpg','Interplay food.jpg','Lizi.jpg','Mental Health.jpg','Microbial Electroiysis Cells.jpg','Musculoskeletal.jpg','Osteoporosis.jpg','Plastic.jpg','Robotics.jpg','Starvalley.jpg','Teacher Post.jpg','Through-screen computing.jpg','Underwater sound.jpg','Water AMS-01.jpg'];
  const grid = document.querySelector('.work-grid');
  if (!grid) return;
  document.head.insertAdjacentHTML('beforeend', `<style>
    #work .page-intro{max-width:450px}.work-grid.marquee-gallery{position:relative;width:100vw;max-width:none;margin-left:calc(50% - 50vw);height:min(53vw,570px);padding:40px 0;overflow:hidden;display:block;transform:rotate(-4deg)}
    .marquee-gallery:before,.marquee-gallery:after{content:"";position:absolute;z-index:4;top:0;bottom:0;width:15vw;pointer-events:none}.marquee-gallery:before{left:0;background:linear-gradient(90deg,#c3e4ed,transparent)}.marquee-gallery:after{right:0;background:linear-gradient(-90deg,#c3e4ed,transparent)}
    .ofg-marquee-track{position:absolute;top:50%;left:0;display:flex;align-items:center;width:max-content;transform:translateY(-50%);animation:ofg-marquee 80s linear infinite;padding:40px 0}.marquee-gallery:has(.marquee-cover:hover) .ofg-marquee-track{animation-play-state:paused}@keyframes ofg-marquee{from{transform:translate(0,-50%)}to{transform:translate(-50%,-50%)}}
    .marquee-book-wrap{width:210px;height:298px;position:relative;flex:0 0 auto;margin-right:-105px;transition:margin .45s cubic-bezier(.2,.7,.2,1);z-index:1}.marquee-book-wrap:has(.marquee-cover:hover){margin-left:58px;z-index:20}.marquee-book-wrap:has(+.marquee-book-wrap .marquee-cover:hover){margin-right:-47px}
    .marquee-cover{position:relative;width:210px;height:298px;display:block;overflow:hidden;border:3px solid var(--ink);background:var(--cream);box-shadow:8px 14px 22px rgba(46,77,99,.35),inset 7px 0 12px rgba(29,48,62,.25);transform:rotate(7deg);transition:transform .45s cubic-bezier(.2,.7,.2,1);cursor:pointer}.marquee-cover:hover{transform:rotate(7deg) translateY(-30px) scale(1.07)}.marquee-cover:before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(18,45,60,.28),transparent 8%,transparent 91%,rgba(255,255,255,.25));pointer-events:none}.marquee-cover img{width:100%;height:100%;display:block;object-fit:cover}.marquee-cover span{position:absolute;z-index:2;left:12px;bottom:12px;padding:5px 7px;background:var(--cream);border:2px solid var(--ink);font:9px "DM Mono",monospace}.marquee-meta{display:none}
    @media(max-width:760px){.work-grid.marquee-gallery{height:390px;margin-top:5px}.marquee-book-wrap{width:142px;height:202px;margin-right:-72px}.marquee-book-wrap:has(.marquee-cover:hover){margin-left:28px}.marquee-book-wrap:has(+.marquee-book-wrap .marquee-cover:hover){margin-right:-44px}.marquee-cover{width:142px;height:202px}.marquee-cover span{left:7px;bottom:7px;font-size:7px;padding:3px}.ofg-marquee-track{padding:25px 0}}
  </style>`);
  const items = [...works, ...works].map((name, index) => {
    const title = name.replace(/\.jpg$/i, '').replace(/-/g, ' ');
    return `<article class="marquee-book-wrap"><button class="marquee-cover" type="button" aria-label="查看 ${title}"><img src="assets/works/${encodeURIComponent(name)}" alt="OFG Studio 项目：${title}" loading="lazy" /><span>${String((index % works.length) + 1).padStart(2, '0')} / OFG</span></button></article>`;
  }).join('');
  grid.className = 'work-grid marquee-gallery';
  grid.innerHTML = `<div class="ofg-marquee-track">${items}</div>`;
}, 0);
