'use strict';
(() => {
  const dashboard = document.getElementById('tab-dashboard');
  const page = document.getElementById('clock-page');
  const clock = document.getElementById('flip-clock');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const digits = [];
  let timer;
  let lastDate = '';

  for (const [index, label] of ['HOURS', 'MINUTES', 'SECONDS'].entries()) {
    if (index) {
      const colon = document.createElement('span');
      colon.className = 'clock-colon';
      colon.textContent = ':';
      colon.setAttribute('aria-hidden', 'true');
      clock.append(colon);
    }
    const group = document.createElement('div');
    group.className = 'clock-group';
    const cards = document.createElement('div');
    cards.className = 'clock-cards';
    for (let i = 0; i < 2; i++) {
      const card = document.createElement('div');
      card.className = 'flip-digit';
      card.setAttribute('aria-hidden', 'true');
      const halves = ['top', 'bottom', 'turn-top', 'turn-bottom'].map(name => {
        const half = document.createElement('span');
        half.className = 'flip-half ' + name;
        const number = document.createElement('span');
        number.textContent = '0';
        half.append(number);
        card.append(half);
        return number;
      });
      cards.append(card);
      digits.push({card, halves, value: null});
    }
    const caption = document.createElement('span');
    caption.className = 'clock-caption';
    caption.textContent = label;
    group.append(cards, caption);
    clock.append(group);
  }

  function update(animate = true) {
    const now = new Date();
    const time = [now.getHours(), now.getMinutes(), now.getSeconds()].map(n => String(n).padStart(2, '0')).join('');
    clock.setAttribute('aria-label', time.match(/../g).join(':'));
    digits.forEach((digit, i) => {
      const value = time[i];
      if (digit.value === value) return;
      const previous = digit.value;
      digit.card.classList.remove('flipping');
      const [top, bottom, turnTop, turnBottom] = digit.halves;
      top.textContent = bottom.textContent = turnBottom.textContent = value;
      turnTop.textContent = previous ?? value;
      if (animate && previous !== null && !reducedMotion.matches) {
        // Restart a changed digit's animation, including after a background pause.
        void digit.card.offsetWidth;
        digit.card.classList.add('flipping');
      }
      digit.value = value;
    });
    const date = now.toDateString();
    if (date !== lastDate) {
      document.getElementById('clock-date').textContent = now.toLocaleDateString(undefined, {weekday:'long', year:'numeric', month:'long', day:'numeric'});
      lastDate = date;
    }
    document.getElementById('clock-zone').textContent = Intl.DateTimeFormat().resolvedOptions().timeZone + ' · LOCAL TIME';
  }

  function schedule() {
    clearTimeout(timer);
    if (page.hidden || document.hidden) return;
    update();
    timer = setTimeout(schedule, 1000 - Date.now() % 1000 + 10);
  }
  document.getElementById('clock-open').addEventListener('click', () => {
    dashboard.hidden = true;
    page.hidden = false;
    update(false);
    schedule();
    document.getElementById('clock-back').focus();
    window.scrollTo(0, 0);
  });
  document.getElementById('clock-back').addEventListener('click', () => {
    clearTimeout(timer);
    page.hidden = true;
    dashboard.hidden = false;
    document.getElementById('clock-open').focus();
  });
  document.addEventListener('visibilitychange', schedule);
})();
