let translations = {};

function loadTranslations(lang) {
  fetch(`json/${lang}.json`)
    .then(response => response.json())
    .then(data => {
      translations = data;
      updateText(lang);
    })
    .catch(error => console.error('Error loading translations:', error));
}

function updateText(lang) {
  // Update text content
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    const keys = key.split('.');
    let value = translations;
    keys.forEach(k => value = value[k]);
    if (value) element.textContent = value;
  });

  // Update placeholders
  document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
    const key = element.getAttribute('data-translate-placeholder');
    const keys = key.split('.');
    let value = translations;
    keys.forEach(k => value = value[k]);
    if (value) element.placeholder = value;
  });

  // Handle RTL for Arabic
  document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  document.body.style.textAlign = lang === 'ar' ? 'right' : 'left';

  // Adjust specific elements
  document.querySelectorAll('.section-title, .menu-info, .footer-info').forEach(element => {
    element.style.textAlign = lang === 'ar' ? 'right' : 'center';
  });

  // Adjust navbar alignment
  const navbarFirst = document.querySelector('.navbar-nav.navbar-nav-first');
  const navbarRight = document.querySelector('.navbar-nav.navbar-right');
  if (lang === 'ar') {
    navbarFirst.style.marginRight = '8em';
    navbarFirst.style.marginLeft = 'auto';
    navbarRight.style.marginRight = 'auto';
    navbarRight.style.marginLeft = '0';
  } else {
    navbarFirst.style.marginRight = '';
    navbarFirst.style.marginLeft = '8em';
    navbarRight.style.marginRight = '';
    navbarRight.style.marginLeft = 'auto';
  }
}

function changeLanguage(lang) {
  localStorage.setItem('language', lang);
  loadTranslations(lang);
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('language') || 'en';
  document.getElementById('language-switcher').value = savedLang;
  loadTranslations(savedLang);
});