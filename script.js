// Typing Effect
const phrases = ["HTML & CSS.", "PostgreSQL.", "SQL Server.", "clean code."];
let phraseIndex = 0; let letterIndex = 0; let isDeleting = false;
const typewriterElement = document.getElementById('typewriter');

function type() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, letterIndex - 1);
        letterIndex--;
    } else {
        typewriterElement.textContent = currentPhrase.substring(0, letterIndex + 1);
        letterIndex++;
    }
    let typingSpeed = isDeleting ? 50 : 100;
    if (!isDeleting && letterIndex === currentPhrase.length) {
        typingSpeed = 2000; isDeleting = true;
    } else if (isDeleting && letterIndex === 0) {
        isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; typingSpeed = 500;
    }
    setTimeout(type, typingSpeed);
}
document.addEventListener("DOMContentLoaded", () => { type(); });

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (window.scrollY / totalHeight) * 100;
    document.getElementById('scroll-progress').style.width = `${scrollPercentage}%`;
});

// Theme Toggle
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    themeToggleBtn.textContent = document.body.classList.contains('light-mode') ? '🌙 Dark Mode' : '☀️ Light Mode';
});

// GitHub Fetcher (Change 'yourusername' below!)
const githubUsername = 'yourusername'; 
const repoContainer = document.getElementById('repo-container');

fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=4`)
    .then(response => response.json())
    .then(repos => {
        repoContainer.innerHTML = ''; 
        repos.forEach(repo => {
            const repoElement = document.createElement('div');
            repoElement.classList.add('repo-card');
            repoElement.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || 'No description provided.'}</p>
                <a href="${repo.html_url}" target="_blank">View Code &rarr;</a>
            `;
            repoContainer.appendChild(repoElement);
        });
    })
    .catch(() => repoContainer.innerHTML = '<p>Error loading repositories.</p>');