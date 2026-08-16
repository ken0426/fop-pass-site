/**
 * FOP Pass 公式サイトの挙動。
 * 依存なし。ヘッダーの状態変化、スクロール表示、モバイルメニュー、お問い合わせのmailto生成。
 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- ヘッダー: スクロールで背景と境界線を出す ---------- */
  var header = document.querySelector('[data-header]');
  if (header) {
    var applyHeaderState = function () {
      var scrolled = window.scrollY > 8;
      header.classList.toggle('bg-white/95', scrolled);
      header.classList.toggle('backdrop-blur', scrolled);
      header.classList.toggle('border-line', scrolled);
      header.classList.toggle('border-transparent', !scrolled);
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

  /* ---------- お問い合わせ: 入力内容からメールを組み立てて起動 ---------- */
  var form = document.querySelector('[data-contact-form]');
  if (form) {
    var address = form.dataset.contactForm;
    var bugFields = form.querySelector('[data-bug-fields]');
    var category = form.querySelector('#category');

    var syncBugFields = function () {
      if (!bugFields || !category) return;
      var isBug = category.value === 'バグ・不具合の報告';
      bugFields.classList.toggle('hidden', !isBug);
      bugFields.setAttribute('aria-hidden', String(!isBug));
    };
    if (category) {
      category.addEventListener('change', syncBugFields);
      syncBugFields();
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var value = function (name) {
        var field = form.querySelector('[name="' + name + '"]');
        return field && field.value ? field.value.trim() : '';
      };

      var lines = [
        '【お問い合わせ種別】',
        value('category'),
        '',
        '【返信先メールアドレス】',
        value('email'),
        '',
        '【内容】',
        value('body'),
      ];

      if (value('category') === 'バグ・不具合の報告') {
        lines.push(
          '',
          '----- 環境（任意） -----',
          'iOSバージョン: ' + (value('ios') || '未記入'),
          'アプリバージョン: ' + (value('appVersion') || '未記入'),
          '端末名: ' + (value('device') || '未記入'),
          '',
          '再現手順:',
          value('steps') || '未記入',
        );
      }

      var subject = value('subject') || 'FOP Pass お問い合わせ';
      var href =
        'mailto:' +
        address +
        '?subject=' +
        encodeURIComponent('[FOP Pass] ' + subject) +
        '&body=' +
        encodeURIComponent(lines.join('\n'));

      window.location.href = href;

      var notice = form.querySelector('[data-mail-notice]');
      if (notice) notice.classList.remove('hidden');
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
            link.classList.toggle('text-muted', !active);
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
