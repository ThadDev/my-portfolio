AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: false,
  mirror: true,
});
// theme toggle

const root = document.documentElement;
const lightIcon = document.getElementById("dark-mode");
const darkIcon = document.getElementById("light-mode");
const menuIcon = document.getElementById("menu-icon");
const navLinks = document.getElementById("nav-links");

function setTheme(primary, secondary) {
  root.style.setProperty("--color-dark", primary);
  root.style.setProperty("--color-light", secondary);
}

lightIcon.addEventListener("click", () => {
  setTheme("#000", "#fff");
  lightIcon.style.display = "none";
  darkIcon.style.display = "inline";
});

darkIcon.addEventListener("click", () => {
  setTheme("#fff", "#000");
  darkIcon.style.display = "none";
  lightIcon.style.display = "inline";
});
// menu toggle
let navOpen = false;

if (menuIcon && navLinks) {
  menuIcon.addEventListener("click", () => {
    if (!navOpen) {
      navLinks.classList.remove("slide-up");
      navLinks.classList.add("slide-down");
      menuIcon.style.transform = "rotate(-90deg)";
      navOpen = true;
    } else {
      navLinks.classList.remove("slide-down");
      navLinks.classList.add("slide-up");
      menuIcon.style.transform = "rotate(90deg)";
      navOpen = false;
    }
  });

  document.querySelectorAll("#nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("slide-down");
      navLinks.classList.add("slide-up");
      menuIcon.style.transform = "rotate(90deg)";
      navOpen = false;
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const words = ["Web app Developer", "Pianist", "Frontend Developer"];
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

//fetch projects from json

fetch("projects.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to load projects.json");
    }
    return response.json();
  })
  .then((projects) => {
    const container = document.getElementById("project-container");

    projects.forEach((project) => {
      const card = document.createElement("div");
      card.classList.add("project-card");

      // Card HTML
      card.innerHTML = `
        <img src="${project.image}" alt="${
        project.title
      }" class="project-image">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tech">
          ${project["tech-stack"]
            .map((tech) => `<span class="tech-badge">${tech}</span>`)
            .join("")}
        </div>
         <div class="overlay">
    <a href="${
      project.live
    }" target="_blank" class="project-link">🔗 Live Demo</a>
    <a href="${
      project.github
    }" target="_blank" class="project-link github"><span class="iconify" data-icon="mdi:github"></span></a>
  </div>
      `;

      // Append card into container
      container.appendChild(card);
    });
  })
  .catch((err) => console.error("Error loading projects:", err));

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      card.classList.toggle("show-overlay");
    }
  });
});
