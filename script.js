for (const href of ['geometry.css', 'layout-refine.css', 'layout-refine-v2.css', 'project-articles.css', 'homepage-v3.css', 'project-scroll.css', 'homepage-v4.css', 'about-mondrian.css', 'project-mondrian.css', 'project-title-layer.css', 'legal.css', 'mobile-refine.css']) { const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = href; document.head.append(link); }
const heroLogo = document.createElement('img'); heroLogo.className = 'hero-logo'; heroLogo.src = 'assets/ofg-home-logo.png'; heroLogo.alt = 'Our Friday Goldfish Studio'; document.querySelector('#home').append(heroLogo);
const home = document.querySelector('#home');
const panel = document.querySelector('#panel');
const closePanel = document.querySelector('#close-panel');
const track = document.querySelector('#track');
const marquee = document.querySelector('#marquee');
const navigation = document.querySelector('.nav');
const mobileMenuButton = document.createElement('button');
mobileMenuButton.className = 'mobile-menu-button';
mobileMenuButton.type = 'button';
mobileMenuButton.setAttribute('aria-label', 'Open menu');
mobileMenuButton.setAttribute('aria-expanded', 'false');
mobileMenuButton.textContent = 'MENU';
navigation.append(mobileMenuButton);
mobileMenuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('menu-open');
  mobileMenuButton.textContent = isOpen ? 'CLOSE' : 'MENU';
  mobileMenuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  mobileMenuButton.setAttribute('aria-expanded', String(isOpen));
});
navigation.querySelector('.nav-links').addEventListener('click', () => {
  navigation.classList.remove('menu-open');
  mobileMenuButton.textContent = 'MENU';
  mobileMenuButton.setAttribute('aria-expanded', 'false');
});
const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char]);

// The work shelf gathers speed as the pointer approaches either side of the viewport.
let marqueeSpeed = 1;
let marqueeTargetSpeed = 1;
let marqueeSpeedFrame = null;
let suppressProjectClick = false;
const updateMarqueeSpeed = () => {
  marqueeSpeed += (marqueeTargetSpeed - marqueeSpeed) * .14;
  track.getAnimations().forEach((animation) => { animation.playbackRate = marqueeSpeed; });
  if (Math.abs(marqueeTargetSpeed - marqueeSpeed) > .01) marqueeSpeedFrame = requestAnimationFrame(updateMarqueeSpeed);
  else marqueeSpeedFrame = null;
};
const setMarqueeSpeed = (speed) => {
  marqueeTargetSpeed = speed;
  if (!marqueeSpeedFrame) marqueeSpeedFrame = requestAnimationFrame(updateMarqueeSpeed);
};
if (window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('pointermove', (event) => {
    if (!panel.hidden || !articleModal.hidden) return;
    const edgeZone = Math.min(300, window.innerWidth * .24);
    const distanceToEdge = Math.min(event.clientX, window.innerWidth - event.clientX);
    const edgeStrength = Math.max(0, 1 - distanceToEdge / edgeZone);
    setMarqueeSpeed(1 + edgeStrength * 2.2);
  });
  window.addEventListener('blur', () => setMarqueeSpeed(1));
}

// On phones, the duplicated work shelf can be swiped directly instead of waiting for the auto-scroll.
if (window.matchMedia('(max-width: 760px)').matches && window.PointerEvent) {
  let activePointerId = null;
  let dragStartX = 0;
  let dragStartY = 0;
  let dragOffset = 0;
  let hasDragged = false;
  const normaliseOffset = (offset) => {
    const loopWidth = track.scrollWidth / 2;
    if (!loopWidth) return offset;
    while (offset > 0) offset -= loopWidth;
    while (offset <= -loopWidth) offset += loopWidth;
    return offset;
  };
  const getTranslateX = () => {
    const transform = getComputedStyle(track).transform;
    if (!transform || transform === 'none') return 0;
    return new DOMMatrixReadOnly(transform).m41;
  };
  const resumeAutoScroll = () => {
    const loopWidth = track.scrollWidth / 2;
    const duration = parseFloat(getComputedStyle(track).animationDuration) || 115;
    const progress = loopWidth ? ((-dragOffset % loopWidth) + loopWidth) % loopWidth / loopWidth : 0;
    track.style.animationDelay = `${-progress * duration}s`;
    track.style.transform = '';
    track.classList.remove('is-dragging');
  };
  marquee.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    activePointerId = event.pointerId;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
    dragOffset = getTranslateX();
    hasDragged = false;
    track.classList.add('is-dragging');
    track.style.transform = `translate(${dragOffset}px, -50%)`;
    marquee.setPointerCapture?.(event.pointerId);
  });
  marquee.addEventListener('pointermove', (event) => {
    if (event.pointerId !== activePointerId) return;
    const distanceX = event.clientX - dragStartX;
    const distanceY = event.clientY - dragStartY;
    if (Math.abs(distanceX) > 6) hasDragged = true;
    if (hasDragged && Math.abs(distanceX) > Math.abs(distanceY)) event.preventDefault();
    dragOffset = normaliseOffset(getTranslateX() + distanceX);
    dragStartX = event.clientX;
    dragStartY = event.clientY;
    track.style.transform = `translate(${dragOffset}px, -50%)`;
  }, { passive: false });
  const finishDrag = (event) => {
    if (event.pointerId !== activePointerId) return;
    if (hasDragged) suppressProjectClick = true;
    resumeAutoScroll();
    activePointerId = null;
  };
  marquee.addEventListener('pointerup', finishDrag);
  marquee.addEventListener('pointercancel', finishDrag);
}

function openPage(name) { panel.hidden = false; document.querySelectorAll('.page').forEach((page) => { page.hidden = page.id !== name; }); document.body.style.overflow = 'hidden'; }
function closePage() { panel.hidden = true; document.body.style.overflow = ''; }
document.querySelectorAll('[data-page]').forEach((button) => button.addEventListener('click', () => openPage(button.dataset.page)));
closePanel.addEventListener('click', closePage);
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { closePage(); document.querySelector('#project-modal')?.setAttribute('hidden', ''); activeProject = null; } });

const articleModal = document.createElement('section'); articleModal.id = 'project-modal'; articleModal.className = 'project-modal'; articleModal.hidden = true; document.body.append(articleModal);
let activeProject = null;
const publicationDates = {
  p01: '2025.04.13', p02: '2025.04.13', p03: '2025.04.13', p04: '2025.04.13', p05: '2026.07.30',
  p06: '2025.04.13', p07: '2025.04.13', p08: '2025.04.13', p09: '2025.04.13', p10: '2025.04.13',
  p11: '2025.04.13', p12: '2025.04.13', p13: '2026.07.28', p14: '2025.04.13', p15: '2025.04.13',
  p16: '2025.04.13', p17: '2025.04.13', p18: '2025.04.13', p19: '2026.08.28', p20: '2025.04.13',
  p21: '2025.04.13', p22: '2025.04.13', p23: '2025.04.13', p24: '2026.07.30', p25: '2025.04.13',
  p26: '2025.04.13', p27: '2025.04.25', p28: '2025.04.13', p29: '2026.07.28', p30: '2025.04.13'
};
const splitProjectTitle = (title) => {
  const divider = title.match(/[｜丨|]/);
  if (!divider) return ['OFG STUDIO', title];
  const position = divider.index;
  return [title.slice(0, position).trim(), title.slice(position + 1).trim()];
};
const extractProjectPalette = (src, fallback) => {
  const image = new Image();
  image.decoding = 'async';
  image.onload = () => {
    const canvas = document.createElement('canvas'); canvas.width = 72; canvas.height = 72;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const buckets = new Map();
    const data = context.getImageData(0, 0, canvas.width, canvas.height).data;
    for (let index = 0; index < data.length; index += 4) {
      const r = data[index]; const g = data[index + 1]; const b = data[index + 2];
      if (r > 248 && g > 248 && b > 248) continue;
      const key = `${r >> 4}-${g >> 4}-${b >> 4}`; buckets.set(key, (buckets.get(key) || 0) + 1);
    }
    const selected = [];
    [...buckets.entries()].sort((a, b) => b[1] - a[1]).forEach(([key]) => {
      if (selected.length === 3) return;
      const [r, g, b] = key.split('-').map((value) => Number(value) * 16 + 8);
      if (selected.every(([x, y, z]) => Math.hypot(x - r, y - g, z - b) > 58)) selected.push([r, g, b]);
    });
    const colours = selected.map(([r, g, b]) => `rgb(${r}, ${g}, ${b})`);
    while (colours.length < 3) colours.push(fallback);
    articleModal.style.setProperty('--project-colour-one', colours[0]);
    articleModal.style.setProperty('--project-colour-two', colours[1]);
    articleModal.style.setProperty('--project-colour-three', colours[2]);
  };
  image.src = src;
};
function openProject(project) {
  activeProject = project;
  const [projectPrefix, projectName] = splitProjectTitle(project.title);
  const translatedProject = document.documentElement.lang === 'en' ? window.ofgEnglishProjects?.[project.id] : null;
  const displayPrefix = translatedProject?.prefix || projectPrefix;
  const displayName = translatedProject?.title || projectName;
  const displayBody = translatedProject?.body || project.body;
  articleModal.style.setProperty('--project-colour', project.color);
  articleModal.style.setProperty('--project-colour-one', project.color);
  articleModal.style.setProperty('--project-colour-two', '#ffffff');
  articleModal.style.setProperty('--project-colour-three', '#111112');
  const publishedDate = project.published ? escapeHtml(project.published) : publicationDates[project.id];
  articleModal.innerHTML = `<button class="project-close" aria-label="Close project">×</button><article class="project-article"><section class="project-hero"><div class="project-mondrian" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><div class="project-hero-copy"><p class="project-meta">OFG STUDIO / PROJECT</p><h2><span class="project-title-prefix">${escapeHtml(displayPrefix)}</span><span class="project-title-name">${escapeHtml(displayName)}</span></h2><p class="project-scroll-cue">SCROLL TO EXPLORE ↓</p></div></section><div class="project-transition" aria-hidden="true"><span></span><span></span><span></span></div><section class="project-detail"><div class="project-detail-head"><time class="project-published">${publishedDate}</time></div>${displayBody ? `<div class="project-copy">${escapeHtml(displayBody)}</div>` : ''}<div class="project-gallery">${project.images.map((src, index) => `<figure class="gallery-item gallery-item-${index + 1}"><img src="${src}" alt="${escapeHtml(displayName)} — ${index + 1}" loading="${index < 3 ? 'eager' : 'lazy'}" /></figure>`).join('')}</div></section></article>`;
  requestAnimationFrame(() => {
    const available = articleModal.clientWidth * .82;
    const titleSize = Math.min(78, Math.max(18, available / (displayName.length * 1.08)));
    articleModal.style.setProperty('--project-title-size', `${titleSize}px`);
  });
  extractProjectPalette(project.images[0], project.color);
  articleModal.hidden = false; document.body.style.overflow = 'hidden'; articleModal.querySelector('.project-close').addEventListener('click', () => { articleModal.hidden = true; activeProject = null; document.body.style.overflow = ''; });
  articleModal.onscroll = () => articleModal.style.setProperty('--project-scroll', `${Math.min(articleModal.scrollTop, 520)}px`);
}
window.refreshOpenProjectLanguage = () => { if (activeProject && !articleModal.hidden) openProject(activeProject); };

fetch('projects.json').then((response) => response.json()).then((projects) => {
  const getHueOrder = (hex) => {
    const rgb = hex.match(/[a-f\d]{2}/gi).map((part) => parseInt(part, 16) / 255);
    const max = Math.max(...rgb); const min = Math.min(...rgb); const chroma = max - min;
    const lightness = (max + min) / 2;
    if (chroma < .12) return lightness < .35 ? 900 : 950;
    let hue = 0;
    if (max === rgb[0]) hue = ((rgb[1] - rgb[2]) / chroma + 6) % 6;
    else if (max === rgb[1]) hue = (rgb[2] - rgb[0]) / chroma + 2;
    else hue = (rgb[0] - rgb[1]) / chroma + 4;
    return hue * 60;
  };
  const getFrameColour = (hex) => {
    const rgb = hex.match(/[a-f\d]{2}/gi).map((part) => parseInt(part, 16) / 255);
    const max = Math.max(...rgb); const min = Math.min(...rgb); const chroma = max - min;
    if (chroma < .16 || max < .35) return '#111112';
    let hue = 0;
    if (max === rgb[0]) hue = ((rgb[1] - rgb[2]) / chroma + 6) % 6;
    else if (max === rgb[1]) hue = (rgb[2] - rgb[0]) / chroma + 2;
    else hue = (rgb[0] - rgb[1]) / chroma + 4;
    hue *= 60;
    const palette = [{ hue: 0, colour: '#dd3228' }, { hue: 48, colour: '#f8bf28' }, { hue: 218, colour: '#3f70b7' }];
    const distance = (a, b) => Math.abs(((a - b + 180) % 360) - 180);
    return palette.reduce((nearest, item) => distance(hue, item.hue) < distance(hue, nearest.hue) ? item : nearest).colour;
  };
  projects.sort((a, b) => getHueOrder(a.color) - getHueOrder(b.color));
  const cards = [...projects, ...projects].map((project, index) => `<article class="book-wrap"><button class="book" type="button" data-project="${project.id}" style="background:${project.color};--frame-colour:${getFrameColour(project.color)}" aria-label="查看项目"><img src="${project.images[0]}" alt="${escapeHtml(project.title)}" loading="${index < 8 ? 'eager' : 'lazy'}" decoding="async" /><span>${String((index % projects.length) + 1).padStart(2, '0')} / OFG</span></button></article>`).join('');
  track.innerHTML = cards;
  track.addEventListener('click', (event) => { if (suppressProjectClick) { suppressProjectClick = false; return; } const button = event.target.closest('[data-project]'); if (button) openProject(projects.find((project) => project.id === button.dataset.project)); });
});

const about = document.querySelector('#about');
about.insertAdjacentHTML('beforeend', `<section class="origin-story"><p class="origin-en">WHY “OUR FRIDAY GOLDFISH STUDIO”?</p><h3>有些名字先出现，<br />意义随后才慢慢游来。</h3><p class="quote">“Put any two random words together and there’s a 70% chance it’s a band name, and a 30% chance it means absolutely nothing.”</p><p>Our Friday Goldfish Studio 源于这句玩笑话。对我们来说，设计也从看似无关的研究、字句、颜色与物件中出发，捕捉偶然的连接，再通过概念、版式与图像，让它们成为清晰、动人且真正属于你的表达。</p></section>`);
const languageSwitch = document.createElement('button'); languageSwitch.className = 'language-switch'; languageSwitch.innerHTML = '<b>中文</b> / EN'; languageSwitch.title = 'English version coming soon'; document.querySelector('.nav').append(languageSwitch);
const siteUpdates = document.createElement('script'); siteUpdates.src = 'site-updates.js?v=20260831-zh-en-fix'; document.body.append(siteUpdates);
