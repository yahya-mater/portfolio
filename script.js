
const DATA = {
  fullName:        "Yahia Arafat Subhi Matar",
  fullNameAr:      "يحيى عرفات صبحي مطر",
  city:            "Zarqa",
  cityAr:          "الزرقاء",
  universityCity:  "Tafila",
  email:           "yahyamater9@gmail.com",
  phone:           "+962 78 846 0070",
  github:          "yahya-mater",
  website:         "https://www.futureisnow.site",
  portfolioUrl:    "https://portfolio.futureisnow.site",
};

function applyData() {
  // Walk every text node in the document
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT
  );

  const replacements = {
    "{{full name}}":       DATA.fullName,
    "{{الاسم الكامل}}":    DATA.fullNameAr,
    "{{city}}":            DATA.city,
    "{{المدينة}}":         DATA.cityAr,
    "{{university city}}": DATA.universityCity,
    "{{email}}":           DATA.email,
    "{{phone}}":           DATA.phone,
    "{{GitHub username}}": DATA.github,
    "{{live website URL}}": DATA.website,
    "{{portfolio url}}":   DATA.portfolioUrl,
  };

  let node;
  while ((node = walker.nextNode())) {
    Object.entries(replacements).forEach(([placeholder, value]) => {
      if (node.nodeValue.includes(placeholder)) {
        node.nodeValue = node.nodeValue.replaceAll(placeholder, value);
      }
    });
  }

  // Also replace inside HTML attributes (href, data-en, data-ar, etc.)
  document.querySelectorAll('*').forEach(el => {
    [...el.attributes].forEach(attr => {
      let val = attr.value;
      Object.entries(replacements).forEach(([placeholder, value]) => {
        if (val.includes(placeholder)) {
          attr.value = val.replaceAll(placeholder, value);
          val = attr.value;
        }
      });
    });
  });
}

applyData();

/* ─── Language Toggle ───────────────────────────────────── */
const langToggle = document.getElementById('langToggle');
let currentLang = 'en';

function setLanguage(lang) {
  currentLang = lang;

  // Update all translatable elements
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) el.innerHTML = text;
  });

  // Toggle RTL class
  if (lang === 'ar') {
    document.body.classList.add('rtl');
    langToggle.textContent = 'English';
    document.documentElement.lang = 'ar';
  } else {
    document.body.classList.remove('rtl');
    langToggle.textContent = 'العربية';
    document.documentElement.lang = 'en';
  }
}

langToggle.addEventListener('click', () => {
  setLanguage(currentLang === 'en' ? 'ar' : 'en');
});

/* ─── Scroll Reveal ─────────────────────────────────────── */
const revealEls = document.querySelectorAll(
  '.project-card, .skill-group, .contact-card, .section-header'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

/* ─── Active Nav Link ───────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${entry.target.id}`
          ? 'var(--ink)'
          : 'var(--ink-muted)';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));