/* =========================================
   FEATURE 1: SCROLL PROGRESS BAR
========================================= */
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scroll-progress');
    // Calculate how far down the page the user has scrolled
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    
    // Convert to a percentage and update the width of the bar
    const scrollPercentage = (scrollPosition / totalHeight) * 100;
    scrollProgress.style.width = `${scrollPercentage}%`;
});

/* =========================================
   FEATURE 2: DARK/LIGHT THEME TOGGLE
========================================= */
const themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', () => {
    // Toggles the 'light-mode' class on the body element
    document.body.classList.toggle('light-mode');
    
    // Change the button text based on the current theme
    if (document.body.classList.contains('light-mode')) {
        themeToggleBtn.textContent = '🌙 Dark Mode';
    } else {
        themeToggleBtn.textContent = '☀️ Light Mode';
    }
});

/* =========================================
   FEATURE 3: LIVE GITHUB REPO FETCHER
========================================= */
// Replace 'yourusername' with your actual GitHub username!
const githubUsername = 'yourusername'; 
const repoContainer = document.getElementById('repo-container');

// Fetch data from the public GitHub API
fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=4`)
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(repos => {
        // Clear the "Loading..." text
        repoContainer.innerHTML = ''; 
        
        // Loop through the repos and create a card for each one
        repos.forEach(repo => {
            const repoElement = document.createElement('div');
            repoElement.classList.add('repo-card');
            
            // If a repo has no description, provide a default fallback
            const description = repo.description ? repo.description : 'No description provided.';
            
            repoElement.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${description}</p>
                <a href="${repo.html_url}" target="_blank">View Code &rarr;</a>
            `;
            repoContainer.appendChild(repoElement);
        });
    })
    .catch(error => {
        repoContainer.innerHTML = '<p>Error loading repositories. Check console.</p>';
        console.error('Error fetching GitHub repos:', error);
    });