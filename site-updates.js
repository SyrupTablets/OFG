const setPage = (id, markup) => {
  const page = document.querySelector(`#${id}`);
  if (page) page.innerHTML = markup;
};

setPage('about', `
  <section class="about-mondrian" aria-label="About Our Friday Goldfish Studio">
    <h2 class="about-title">About Our Friday Goldfish Studio</h2>
    <div class="about-grid">
      <section class="mondrian-cell about-white about-intro"><p>我们是 base 在荷兰的平面设计事务所，Our Friday Goldfish Studio。接单各类封面设计、海报设计、平面设计、书籍装帧设计。</p></section>
      <section class="mondrian-cell about-red"><p>研究、出版<br />与视觉表达。</p></section>
      <section class="mondrian-cell about-yellow"><p>让想法在这里<br />一起游动。</p></section>
      <section class="mondrian-cell about-white about-invoice"><p>可开发票，与荷兰知名大学各博士项目组已有过长期合作，博士组可向组内提交封面设计经费报销。</p></section>
      <section class="mondrian-cell about-blue"><p class="about-eyebrow">WHY “OUR FRIDAY GOLDFISH”?</p><h3>有些名字先出现，<br />意义随后才慢慢游来。</h3><p class="about-quote" lang="en">"Put any two random words together and there's a 70% chance it's a band name, and a 30% chance it means absolutely nothing."</p><p>Our Friday Goldfish Studio 源于这句玩笑话。设计也从看似无关的研究、字句、颜色与物件中出发，捕捉偶然的连接，再通过概念、版式与图像，让它们成为清晰、动人且真正属于你的表达。</p></section>
      <div class="mondrian-cell about-black" aria-hidden="true"></div>
    </div>
    <p class="about-hint">HOVER THE COLOUR BLOCKS · SCROLL TO SHIFT THE COMPOSITION</p>
  </section>
`);

panel.addEventListener('scroll', () => {
  const aboutGrid = document.querySelector('.about-grid');
  if (!aboutGrid || document.querySelector('#about')?.hidden) return;
  const shift = Math.min(panel.scrollTop / 750, 1);
  aboutGrid.style.setProperty('--about-col-1', `${1.15 + shift * .32}fr`);
  aboutGrid.style.setProperty('--about-col-2', `${.88 - shift * .18}fr`);
  aboutGrid.style.setProperty('--about-col-3', `${1.36 + shift * .18}fr`);
  aboutGrid.style.setProperty('--about-row-1', `${1.06 - shift * .18}fr`);
  aboutGrid.style.setProperty('--about-row-2', `${.82 + shift * .27}fr`);
});

const englishProjectsScript = document.createElement('script');
englishProjectsScript.src = 'english-projects.js?v=20260831-p04-copy-fix';
englishProjectsScript.onload = () => { const localizationScript = document.createElement('script'); localizationScript.src = 'localization.js?v=20260831-zh-en-fix'; document.body.append(localizationScript); };
document.body.append(englishProjectsScript);

setPage('services', `
  <p class="label">02 / SERVICES</p>
  <h2>服务费用</h2>
  <div class="price"><b>€300</b><span>DESIGN SERVICE FEE</span></div>
  <p><strong>设计服务费：€300</strong></p>
  <p>包含整套设计及印前调整：</p>
  <ul><li>封面、封底、书脊</li><li>答辩 Invitation 笺页</li><li>无文字版的封面图稿（适宜用作 PPT 汇报首页背景图）</li><li>提交打印前的所有格式调整</li></ul>
  <p>如需<strong>论文内页排版</strong>等额外服务，可根据章节数量单独报价。</p>
  <h3>时间线</h3>
  <p>交付时间会根据打印店或电子版的最终截止日期倒推安排。</p>
  <p>正常周期约 <strong>3–4 周</strong>。如时间紧急，可<strong>免费走急单通道</strong>，最快约 <strong>1 周出图</strong>。但由于共同讨论和推敲的时间会相应缩短，设计细节可能不如正常周期充分。</p>
  <h3>付款方式</h3>
  <p><strong>自费：€300</strong><br />分两期支付：€100 定金 + 交图后 €200 尾款。</p>
  <p><strong>研究组／项目经费：发票金额 €490</strong><br />可通过博士研究组或项目预算报销。由于企业开票涉及相关税费，需开具 €490 发票，其中约 €190 为税费并上缴政府；<strong>设计师实际设计服务收入仍为 €300，与自费价格一致。</strong></p>
`);

setPage('contract', `
  <p class="label">03 / CONTRACT</p>
  <h2>先说清楚，<br />才可以放心开始。</h2>
  <p>填写下列表单后，即可自动下载中英双语设计服务合同。</p>
  <div class="contract-form"><iframe data-tally-src="https://tally.so/embed/q4lEkO?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" loading="lazy" width="100%" height="580" frameborder="0" marginheight="0" marginwidth="0" title="设计服务合同下载表单"></iframe></div>
`);

const tallyEmbedScript = document.createElement('script');
tallyEmbedScript.src = 'https://tally.so/widgets/embed.js';
tallyEmbedScript.async = true;
document.body.append(tallyEmbedScript);

setPage('contact', `
  <p class="label">04 / CONTACT</p>
  <h2>把你的想法<br />交给我们。</h2>
  <p>咨询时请附上<strong>研究主题及预计交稿时间</strong>。如已有视觉偏好，也欢迎提供<strong>参考图片、风格方向或初步想法</strong>，方便我们更快了解你的需求。</p>
  <div class="contact-list">
    <p>微信：<button type="button" class="wechat-link" data-wechat-qr>SyrupTablets</button></p>
    <p>WhatsApp：<a href="https://wa.me/8615882410847" target="_blank" rel="noopener">+86 15882410847 ↗</a></p>
    <p>小红书：金鱼游过星期五</p>
    <a href="mailto:ourfridaygoldfish@gmail.com">邮箱：ourfridaygoldfish@gmail.com ↗</a>
    <p>电话：+31 6 14296059</p>
  </div>
`);

const wechatQrDialog = document.createElement('dialog');
wechatQrDialog.className = 'wechat-qr-dialog';
wechatQrDialog.innerHTML = `<button type="button" class="wechat-qr-close" aria-label="关闭二维码">×</button><img src="assets/wechat-qr.jpg" alt="SyrupTablets 的微信二维码" /><p>微信扫码添加 SyrupTablets</p><a href="assets/wechat-qr.jpg" download="SyrupTablets-WeChat-QR.jpg">保存二维码 ↓</a>`;
document.body.append(wechatQrDialog);
document.addEventListener('click', (event) => {
  if (event.target.closest('[data-wechat-qr]')) wechatQrDialog.showModal();
  if (event.target.closest('.wechat-qr-close')) wechatQrDialog.close();
});
wechatQrDialog.addEventListener('click', (event) => { if (event.target === wechatQrDialog) wechatQrDialog.close(); });
