/**
 * FOP Pass 公式サイトの挙動。
 * 依存なし。ヘッダーの影、スクロール表示、モバイルメニュー、現在地の強調。
 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- ヘッダー: 追従中だけ影を落として本文と分ける ---------- */
  var header = document.querySelector('[data-header]');
  if (header) {
    var applyHeaderState = function () {
      header.classList.toggle('shadow-[0_1px_8px_rgba(20,22,26,0.08)]', window.scrollY > 8);
    };
    applyHeaderState();
    window.addEventListener('scroll', applyHeaderState, { passive: true });
  }

  /* ---------- モバイルメニュー ---------- */
  var toggle = document.querySelector('[data-menu-toggle]');
  var panel = document.querySelector('[data-menu-panel]');
  if (toggle && panel) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      panel.classList.toggle('hidden', !open);
      document.body.classList.toggle('overflow-hidden', open);
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    panel.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setOpen(false);
    });
  }

  /* ---------- スクロールで自然に現れる ---------- */
  var revealables = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var delay = Number(entry.target.dataset.delay || 0);
          window.setTimeout(function () {
            entry.target.classList.add('is-visible');
          }, delay);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    );
    revealables.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- 現在地のナビゲーションを強調 ---------- */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('[data-navlink]');
  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (link) {
            var active = link.getAttribute('href') === '#' + entry.target.id;
            link.classList.toggle('text-ink', active);
            link.classList.toggle('text-sub', !active);
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach(function (section) {
      navObserver.observe(section);
    });
  }
})();
