(() => {
  'use strict';
  const root = document.documentElement;
  root.classList.add('js');
  const original = new Map();
  document.querySelectorAll('[data-i18n]').forEach(el => original.set(el.dataset.i18n, el.innerHTML));
  const originalAria = new Map();
  document.querySelectorAll('[data-i18n-aria]').forEach(el => originalAria.set(el.dataset.i18nAria, el.getAttribute('aria-label')));
  const en = {
    skip: 'Skip to content', navAbout: 'About me', navApproach: 'My approach', navExperience: 'Experience', navContact: 'Get in touch',
    heroEyebrow: 'SARA KUAT · ENGLISH TEACHER', heroLine1: 'Learn English.', heroLine2: 'Find your', heroLine3: 'confidence.',
    heroDescription: 'Learning a language opens up new possibilities. Let’s build understanding and the confidence to use English in everyday life.',
    heroCta: 'Let’s talk about lessons', heroMore: 'A little about me', heroNote: 'Knowledge. Experience. Human connection.',
    helloName: "I'm Sara.", englishSticker: 'Advanced language proficiency',
    aboutEyebrow: 'NICE TO MEET YOU', aboutTitle: 'A teacher. A language lover.<br>A curious mind.',
    aboutLead: 'Hello, I’m Sara! I teach English and value the connections that education and cultural exchange create.',
    aboutBody: 'To me, a language is much more than a set of rules. It lets us meet people, share ideas and see the world from a different perspective. Teaching in Kazakhstan and working in the USA have helped shape that outlook.',
    aboutBody2: 'Responsibility, creativity and communication guide my work. In my lessons, I value clear explanations and a supportive learning environment.',
    educationEyebrow: 'EDUCATION', university: 'Pavlodar Pedagogical University named after Alkey Margulan',
    degree: 'Foreign languages: English and Chinese<br>Bachelor’s degree', academicResult: 'Academic result',
    languageIntro: 'Every language.<br>A new perspective.', kazakh: 'Kazakh', english: 'English', russian: 'Russian', chinese: 'Chinese',
    kazakhLevel: 'Proficient', englishLevel: 'Advanced', russianLevel: 'Intermediate', chineseLevel: 'Studied at university',
    approachEyebrow: 'MY TEACHING APPROACH', approachTitle: 'Small steps.<br><em>Growing confidence.</em>',
    approachIntro: 'Curiosity makes learning feel more natural. Here are a few ways I help students connect with the language.',
    method1Title: 'Learning through communication', method1Text: 'Connecting vocabulary to everyday situations and practising how to express ideas in English.',
    method2Title: 'Engaging, interactive activities', method2Text: 'Creating lesson plans for students of different ages and language levels.',
    method3Title: 'Support and regular feedback', method3Text: 'Following progress and working through questions together. Mistakes are part of learning.',
    demoLabel: 'LET’S START WITH ONE WORD', wordType: 'NOUN · A LITTLE ENGLISH PRACTICE',
    wordTranslation: 'a belief in yourself', wordTranslationExample: 'Trust in your ability<br>to learn and make progress.',
    revealTranslation: 'Discover the meaning', hideTranslation: 'Hide the meaning', demoNote: 'One new word today.<br>Your first step is already taken!',
    experienceEyebrow: 'MY JOURNEY', experienceTitle: 'Where learning<br>meets real life.',
    experienceIntro: 'From the classroom to an international workplace, every experience has taught me more about connecting with people.',
    teachingTag: 'TEACHING', nazarRole: 'English teacher', kazakhstan: '· Kazakhstan',
    nazarBody: 'Teaching students of different ages and proficiency levels. Creating engaging lesson plans and interactive activities, monitoring progress and providing regular feedback.',
    internationalTag: 'INTERNATIONAL EXPERIENCE', hotelRole: 'Hotel supervisor', usa: '· USA',
    hotelBody: 'Working in an international environment through the Work & Travel programme. Coordinating a team, training new colleagues and communicating with guests in English.',
    developmentTag: 'LEARNING & COMMUNITY', pavlodar: 'Pavlodar · Kazakhstan',
    accessBody: 'A graduate of the English Access Microscholarship programme. A member of Enactus, taking part in teamwork and student-led initiatives.',
    contactEyebrow: 'LET’S TALK · GET IN TOUCH', contactTitle: 'New possibilities<br><em>start with hello.</em>',
    contactIntro: 'Curious about English lessons or interested in working together? Get in touch in whichever way suits you.',
    writeMessage: 'Send a message', call: 'Give me a call', email: 'Email', footerName: 'Sara Kuat.', backTop: 'Back to top', floatingLabel: 'Let’s talk'
  };
  const enAria = {mainNav:'Main navigation',siteLanguage:'Website language',openMenu:'Open menu',mobileNav:'Mobile navigation',educationLabel:'Education',whatsappAria:'Message Sara on WhatsApp'};
  let currentLanguage = 'kk';
  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const translateButton = document.getElementById('translate-button');
  const translation = document.getElementById('word-translation');
  const wordCard = document.getElementById('word-card');

  function updateWordButton() {
    translateButton.querySelector('span').textContent = translation.hidden
      ? (currentLanguage === 'en' ? en.revealTranslation : 'Мағынасын ашу')
      : (currentLanguage === 'en' ? en.hideTranslation : 'Мағынасын жасыру');
    translateButton.setAttribute('aria-expanded', String(!translation.hidden));
    wordCard.classList.toggle('is-open', !translation.hidden);
  }
  function setMenu(open) {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', currentLanguage === 'en' ? (open ? 'Close menu' : 'Open menu') : (open ? 'Мәзірді жабу' : 'Мәзірді ашу'));
    mobileNav.hidden = !open;
  }
  function setLanguage(language) {
    currentLanguage = language === 'en' ? 'en' : 'kk';
    root.lang = currentLanguage;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      el.innerHTML = currentLanguage === 'en' ? (en[key] ?? original.get(key)) : original.get(key);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.dataset.i18nAria;
      el.setAttribute('aria-label', currentLanguage === 'en' ? (enAria[key] ?? originalAria.get(key)) : originalAria.get(key));
    });
    document.querySelectorAll('[data-language]').forEach(button => {
      const active = button.dataset.language === currentLanguage;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    const english = currentLanguage === 'en';
    document.querySelector('[data-i18n-alt="portraitAlt"]').alt = english ? 'Sara Kuat, English teacher' : 'Ағылшын тілі мұғалімі Сара Қуат';
    document.title = english ? 'Sara Kuat — English Teacher' : 'Сара Қуат — Ағылшын тілі мұғалімі';
    document.querySelector('meta[name="description"]').content = english
      ? 'Sara Kuat — English teacher. Explore her education, international experience and teaching approach. Get in touch about lessons.'
      : 'Сара Қуат — ағылшын тілі мұғалімі. Білімі, халықаралық тәжірибесі және оқыту тәсілі. Сабақ туралы WhatsApp арқылы хабарласыңыз.';
    const message = english ? 'Hello Sara! I would like to know more about your English lessons.' : 'Сәлеметсіз бе, Сара! Ағылшын тілі сабағы туралы білгім келеді.';
    document.querySelectorAll('.whatsapp-link').forEach(link => { link.href = 'https://wa.me/77716269792?text=' + encodeURIComponent(message); });
    updateWordButton();
    setMenu(menuButton.getAttribute('aria-expanded') === 'true');
    try { localStorage.setItem('sara-kuat-language', currentLanguage); } catch (_) { /* The page also works without browser storage. */ }
  }

  document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language)));
  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', event => { if(event.key === 'Escape' && !mobileNav.hidden) { setMenu(false); menuButton.focus(); } });
  document.addEventListener('click', event => { if (!mobileNav.hidden && !event.target.closest('.site-header')) setMenu(false); });
  const desktopMedia = window.matchMedia('(min-width: 901px)');
  desktopMedia.addEventListener('change', event => { if(event.matches) setMenu(false); });
  translateButton.addEventListener('click', () => { translation.hidden = !translation.hidden; updateWordButton(); });
  document.getElementById('copyright-year').textContent = String(new Date().getFullYear());
  let savedLanguage = 'kk';
  try { savedLanguage = localStorage.getItem('sara-kuat-language') || 'kk'; } catch (_) { /* Use the Kazakh default. */ }
  setLanguage(savedLanguage);

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if(entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
    }), { threshold: 0.09, rootMargin: '0px 0px -20px 0px' });
    revealElements.forEach(el => revealObserver.observe(el));
    const navLinks = Array.from(document.querySelectorAll('.desktop-nav a'));
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === '#' + entry.target.id;
            link.classList.toggle('active', isActive);
            if (isActive) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
          });
        }
      });
    }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
    document.querySelectorAll('main > section[id]').forEach(section => sectionObserver.observe(section));
  } else { revealElements.forEach(el => el.classList.add('is-visible')); }
})();
