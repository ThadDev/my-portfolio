AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: false,
  mirror: true,
});

const menuIcon = document.getElementById('menu-icond');
const navLinks = document.getElementById('nav-links');
const dark = document.getElementById('toggle-night');
const light = document.getElementById('toggle-day');
const p = document.getElementById('param');
const body = document.body;

if (localStorage.getItem('mode') === 'dark') {
  night();
} else {
  day();
}

if (dark) {
  dark.addEventListener('click', () => {
    night();
    localStorage.setItem('mode', 'dark');
  });
}

if (light) {
  light.addEventListener('click', () => {
    day();
    localStorage.setItem('mode', 'light');
  });
}

function night() {
  if (!dark || !light || !p || !menuIcon) return;

  body.style.backgroundColor = 'black';
  dark.style.display = 'none';
  light.style.display = 'flex';
  p.style.color = 'white';

  const navbar = document.getElementById('mainNavbar');
  if (navbar) {
    navbar.classList.remove('navbar-custom-light');
    navbar.classList.add('navbar-custom-dark');
  }

  const btn3 = document.getElementById('btn3');
  if (btn3) btn3.style.color = 'white';
navLinks.style.backgroundColor = '';
  menuIcon.style.color = 'white';
}

function day() {
  if (!dark || !light || !p || !menuIcon ) return;

  dark.style.display = 'flex';
  light.style.display = 'none';
  body.style.backgroundColor = 'white';
  p.style.color = 'black';
  const navbar = document.getElementById('mainNavbar');
  if (navbar) {
    navbar.classList.remove('navbar-custom-dark');
    navbar.classList.add('navbar-custom-light');
  }

  const btn3 = document.getElementById('btn3');
  if (btn3) btn3.style.color = 'black';
  navLinks.style.backgroundColor = 'white';
  menuIcon.style.color = "black"

}

let navOpen = false;

if (menuIcon && navLinks) {
  menuIcon.addEventListener('click', () => {
    if (!navOpen) {
      navLinks.classList.remove('slide-up');
      navLinks.classList.add('slide-down');
      menuIcon.style.transform = 'rotate(-90deg)';
      navOpen = true;
    } else {
      navLinks.classList.remove('slide-down');
      navLinks.classList.add('slide-up');
      menuIcon.style.transform = 'rotate(90deg)';
      navOpen = false;
    }
  });

  document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('slide-down');
      navLinks.classList.add('slide-up');
      menuIcon.style.transform = 'rotate(90deg)';
      navOpen = false;
    });
  });
}


document.addEventListener("DOMContentLoaded", () => {
  const words = [
    "Web app Developer",
    "Brand Designer",
    "Pianist",
    "Frontend Developer",
  
  ];
  const typingText = document.getElementById("typing-text");

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    typingText.textContent = currentChar;

    if (!isDeleting && charIndex < currentWord.length) {
      charIndex++;
      setTimeout(typeEffect, 100);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(typeEffect, 60);
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) {
        wordIndex = (wordIndex + 1) % words.length;
      }
      setTimeout(typeEffect, 800);
    }
  }

  typeEffect();
});