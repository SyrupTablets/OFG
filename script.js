for (const href of ['geometry.css', 'layout-refine.css', 'layout-refine-v2.css', 'project-articles.css', 'homepage-v3.css', 'project-scroll.css', 'homepage-v4.css', 'about-mondrian.css', 'project-mondrian.css', 'project-title-layer.css', 'legal.css', 'mobile-refine.css', 'contract-form.css', 'book-3d.css', 'hero-image-blocks.css']) { const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = href; document.head.append(link); }
const heroLogo = document.createElement('img'); heroLogo.className = 'hero-logo'; heroLogo.src = 'assets/ofg-home-logo.png'; heroLogo.alt = 'Our Friday Goldfish Studio'; document.querySelector('#home').append(heroLogo);
const home = document.querySelector('#home');
const heroArt = document.createElement('div');
heroArt.className = 'hero-art-blocks';
heroArt.setAttribute('aria-hidden', 'true');
heroArt.innerHTML = '<i class="hero-art-block hero-art-block--blue-top" data-art-block></i><i class="hero-art-block hero-art-block--red" data-art-block></i><i class="hero-art-block hero-art-block--paper hero-art-block--logo-well"></i><i class="hero-art-block hero-art-block--yellow" data-art-block></i><i class="hero-art-block hero-art-block--black" data-art-block></i><i class="hero-art-block hero-art-block--red-stripe" data-art-block></i><i class="hero-art-block hero-art-block--blue" data-art-block></i><i class="hero-art-block hero-art-block--yellow-lower" data-art-block></i>';
home.prepend(heroArt);

// These source fragments come from the complete OFG project archive: cover artwork,
// spreads and supplied visual references. Every one is pre-cropped to avoid titles,
// captions and other readable copy. A new fragment is selected on each hover.
const heroArtSources = [
  ['assets/background-art/ref01.jpg', '50% 54%', '145%'],
  ['assets/background-art/ref05.jpg', '52% 56%', '155%'],
  ['assets/background-art/ref08-safe.jpg', '45% 58%', '155%'],
  ['assets/background-art/ref13.jpg', '50% 62%', '155%'],
  ['assets/background-art/projects/safe-p02-1.jpg', '50% 54%', '150%'],
  ['assets/background-art/projects/safe-p04-1.jpg', '52% 46%', '160%'],
  ['assets/background-art/projects/safe-p05-1.jpg', '48% 54%', '155%'],
  ['assets/background-art/projects/safe-p06-1.jpg', '46% 54%', '150%'],
  ['assets/background-art/projects/safe-p07-1.jpg', '52% 50%', '150%'],
  ['assets/background-art/projects/safe-p08-1.jpg', '48% 54%', '155%'],
  ['assets/background-art/projects/safe-p11-1.jpg', '50% 52%', '155%'],
  ['assets/background-art/projects/safe-p12-1.jpg', '52% 50%', '150%'],
  ['assets/background-art/projects/safe-p14-1.jpg', '50% 52%', '160%'],
  ['assets/background-art/projects/safe-p16-1.jpg', '48% 56%', '150%'],
  ['assets/background-art/projects/safe-p17-1.jpg', '50% 50%', '155%'],
  ['assets/background-art/projects/safe-p19-1.jpg', '50% 52%', '155%'],
  ['assets/background-art/projects/safe-p20-1.jpg', '52% 52%', '155%'],
  ['assets/background-art/projects/safe-p21-1.jpg', '50% 50%', '150%'],
  ['assets/background-art/projects/safe-p23-1.jpg', '50% 50%', '155%'],
  ['assets/background-art/projects/safe-p25-1.jpg', '50% 52%', '150%'],
  ['assets/background-art/projects/safe-p26-1.jpg', '50% 52%', '155%'],
  ['assets/background-art/projects/safe-p27-2.jpg', '50% 50%', '160%'],
  ['assets/background-art/projects/safe-p29-1.jpg', '50% 52%', '155%'],
  ['assets/background-art/projects/safe-p30-1.jpg', '50% 50%', '155%']
];
document.querySelectorAll('[data-art-block]').forEach((block, blockIndex) => {
  let previous = -1;
  const revealArtwork = () => {
    let next = Math.floor(Math.random() * heroArtSources.length);
    if (heroArtSources.length > 1) while (next === previous) next = Math.floor(Math.random() * heroArtSources.length);
    previous = next;
    const [source, position, size] = heroArtSources[next];
    block.style.setProperty('--block-art', `url("${source}")`);
    block.style.setProperty('--block-art-position', position);
    block.style.setProperty('--block-art-size', size);
    block.style.setProperty('--block-delay', `${blockIndex * 22}ms`);
    block.classList.remove('is-art-visible');
    requestAnimationFrame(() => block.classList.add('is-art-visible'));
  };
  block.addEventListener('pointerenter', revealArtwork);
  block.addEventListener('pointerleave', () => block.classList.remove('is-art-visible'));
  block.addEventListener('touchstart', revealArtwork, { passive: true });
});
const panel = document.querySelector('#panel');
const closePanel = document.querySelector('#close-panel');
const track = document.querySelector('#track');
const marquee = document.querySelector('#marquee');
const shelfCopies = 3;
const navigation = document.querySelector('.nav');
const brand = document.querySelector('.brand');
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
brand.addEventListener('click', (event) => {
  if (!window.matchMedia('(max-width: 760px)').matches) return;
  const openProjectModal = document.querySelector('#project-modal:not([hidden])');
  if (panel.hidden && !openProjectModal) return;
  event.preventDefault();
  closePage();
  if (openProjectModal) openProjectModal.hidden = true;
  activeProject = null;
  window.resetBookStage?.();
  document.body.classList.remove('project-open');
  document.body.style.overflow = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
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

// The duplicated book shelf can be dragged on any device instead of waiting for the auto-scroll.
if (window.PointerEvent) {
  let activePointerId = null;
  let dragStartX = 0;
  let dragStartY = 0;
  let dragOffset = 0;
  let hasDragged = false;
  const normaliseOffset = (offset) => {
    const loopWidth = track.scrollWidth / shelfCopies;
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
    const loopWidth = track.scrollWidth / shelfCopies;
    const duration = parseFloat(getComputedStyle(track).animationDuration) || 115;
    const progress = loopWidth ? ((-dragOffset % loopWidth) + loopWidth) % loopWidth / loopWidth : 0;
    track.style.animationDelay = `${-progress * duration}s`;
    track.style.transform = '';
    track.classList.remove('is-dragging');
  };
  marquee.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    // A book is a link-like control: let its own click open the article. Dragging
    // starts only from the space between books, so an enlarged hover-book remains
    // reliably clickable with one press.
    if (event.target.closest('.book')) return;
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
    if (hasDragged) {
      // Ignore only the click generated by this drag. Leaving the flag set would
      // accidentally swallow the visitor's next genuine project click.
      suppressProjectClick = true;
      window.setTimeout(() => { suppressProjectClick = false; }, 0);
    }
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
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { closePage(); document.querySelector('#project-modal')?.setAttribute('hidden', ''); activeProject = null; window.resetBookStage?.(); document.body.classList.remove('project-open'); } });

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
const titleColourFor = (colour) => {
  const parts = colour.replace('#', '').match(/[a-f\d]{2}/gi);
  if (!parts || parts.length !== 3) return '#111112';
  const [red, green, blue] = parts.map((part) => parseInt(part, 16) / 255);
  const luminance = .2126 * red + .7152 * green + .0722 * blue;
  return luminance < .42 ? '#ffffff' : '#111112';
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
  articleModal.style.setProperty('--project-title-colour', titleColourFor(project.color));
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
  articleModal.hidden = false; document.body.classList.add('project-open'); document.body.style.overflow = 'hidden'; articleModal.querySelector('.project-close').addEventListener('click', () => { articleModal.hidden = true; activeProject = null; window.resetBookStage?.(); document.body.classList.remove('project-open'); document.body.style.overflow = ''; });
  articleModal.onscroll = () => articleModal.style.setProperty('--project-scroll', `${Math.min(articleModal.scrollTop, 520)}px`);
}
window.refreshOpenProjectLanguage = () => { if (activeProject && !articleModal.hidden) openProject(activeProject); };

fetch('projects.json').then((response) => response.json()).then((projects) => {
  // Two client-private commissions join the shelf only. They intentionally have no detail page.
  projects.push(
    { id: 'p31', title: 'PRIVATE COMMISSION · 31', body: '', images: [], color: '#b8d7d2', private: true },
    { id: 'p32', title: 'PRIVATE COMMISSION · 32', body: '', images: [], color: '#f18b20', private: true }
  );
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
  const splitBookAsset = (id, face) => {
    if (id === 'p31' || id === 'p32') {
      const fileId = id === 'p31' ? 'P31' : 'P32';
      return `assets/books/${encodeURIComponent('拆分封面封底')}/${fileId}%20${face}.jpg`;
    }
    const fileFace = id === 'p21' && face === 'spine' ? 'spin' : face;
    return `assets/books/${encodeURIComponent('拆分封面封底')}/${id}-${fileFace}.jpg`;
  };
  const bookMarkup = (project, index, className = '') => {
    // Keep every cover facing the reader with its spine subtly exposed.
    const turns = [-27, -24, -21, -18, -15, -12, -9, -6];
    const turn = turns[index % turns.length];
    const isPrivate = Boolean(project.private);
    const state = isPrivate ? ' book--private' : '';
    return `<button class="book ${className}${state}" type="button" data-project="${project.id}" data-front="${splitBookAsset(project.id, 'front')}" data-spine="${splitBookAsset(project.id, 'spine')}" style="--book-turn:${turn}deg;--book-colour:${project.color};--frame-colour:${getFrameColour(project.color)}" aria-label="${isPrivate ? 'Private commission, preview only' : `查看项目 ${escapeHtml(project.title)}`}"${isPrivate ? ' aria-disabled="true"' : ''}><span class="book-back" aria-hidden="true"></span><span class="book-spine" aria-hidden="true"></span><span class="book-front" aria-hidden="true"></span><span class="book-pages" aria-hidden="true"></span><span class="book-label">${project.id.slice(1).padStart(2, '0')} / OFG</span></button>`;
  };
  // Three identical sequences make the physical shelf continuously draggable in either direction.
  const cards = Array.from({ length: shelfCopies }, () => projects).flat().map((project, index) => `<article class="book-wrap">${bookMarkup(project, index)}</article>`).join('');
  track.innerHTML = cards;
  // The previous shelf requested every large cover and spine at once (over 90 MB).
  // Hydrate only books that are about to enter the visible strip, then retain them.
  const hydrateBook = (button) => {
    if (button.dataset.hydrated) return;
    button.dataset.hydrated = 'true';
    button.style.setProperty('--front-image', `url("${button.dataset.front}")`);
    button.style.setProperty('--spine-image', `url("${button.dataset.spine}")`);
    requestAnimationFrame(() => button.classList.add('is-art-ready'));
  };
  const bookButtons = [...track.querySelectorAll('.book')];
  if ('IntersectionObserver' in window) {
    const assetObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        hydrateBook(entry.target.querySelector('.book'));
        assetObserver.unobserve(entry.target);
      });
    }, { root: marquee, rootMargin: '240px 45%' });
    bookButtons.forEach((button) => assetObserver.observe(button.closest('.book-wrap')));
  } else bookButtons.forEach(hydrateBook);
  bookButtons.forEach((button) => button.addEventListener('pointerenter', () => hydrateBook(button), { once: true }));
  // Bind directly to each book: a real click opens its article immediately, while a
  // drag still suppresses only the release-click generated by that drag.
  bookButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (suppressProjectClick) { suppressProjectClick = false; return; }
      const project = projects.find((item) => item.id === button.dataset.project);
      if (!project || project.private) return;
      openProject(project);
    });
  });
});

const about = document.querySelector('#about');
about.insertAdjacentHTML('beforeend', `<section class="origin-story"><p class="origin-en">WHY “OUR FRIDAY GOLDFISH STUDIO”?</p><h3>有些名字先出现，<br />意义随后才慢慢游来。</h3><p class="quote">“Put any two random words together and there’s a 70% chance it’s a band name, and a 30% chance it means absolutely nothing.”</p><p>Our Friday Goldfish Studio 源于这句玩笑话。对我们来说，设计也从看似无关的研究、字句、颜色与物件中出发，捕捉偶然的连接，再通过概念、版式与图像，让它们成为清晰、动人且真正属于你的表达。</p></section>`);
const languageSwitch = document.createElement('button'); languageSwitch.className = 'language-switch'; languageSwitch.innerHTML = '<b>中文</b> / EN'; languageSwitch.title = 'English version coming soon'; document.querySelector('.nav').append(languageSwitch);
const siteUpdates = document.createElement('script'); siteUpdates.src = 'site-updates.js?v=20260831-zh-en-fix'; document.body.append(siteUpdates);
