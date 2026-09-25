document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Sticky Navbar Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. Advanced Scroll Reveal Animations ---
    // This looks for any element with the 'reveal' class and fades it up professionally when it enters the viewport.
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15, // Triggers when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Only animate once for a professional feel
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // --- 3. Dynamic Footer Year ---
    document.getElementById('year').textContent = new Date().getFullYear();

    // --- 4. Live GitHub API Fetch (User: R-Kanungo) ---
    const githubUsername = 'R-Kanungo'; 
    const repoContainer = document.getElementById('repo-container');

    // Fetching the 4 most recently updated public repositories
    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=4`)
        .then(response => {
            if (!response.ok) throw new Error('GitHub API response failed.');
            return response.json();
        })
        .then(repos => {
            repoContainer.innerHTML = ''; // Remove loader
            
            if (repos.length === 0) {
                repoContainer.innerHTML = '<p class="section-subtitle">No public repositories found yet.</p>';
                return;
            }

            repos.forEach(repo => {
                const repoElement = document.createElement('div');
                repoElement.classList.add('repo-card');
                
                // Truncate description if it's too long
                let desc = repo.description || 'No description provided for this repository.';
                if (desc.length > 100) desc = desc.substring(0, 100) + '...';

                repoElement.innerHTML = `
                    <div class="repo-header">
                        <h3>${repo.name}</h3>
                        <i class="fa-brands fa-github"></i>
                    </div>
                    <p class="repo-desc">${desc}</p>
                    <a href="${repo.html_url}" target="_blank" class="repo-link">View Source <i class="fa-solid fa-arrow-right-long"></i></a>
                `;
                repoContainer.appendChild(repoElement);
            });
        })
        .catch(error => {
            console.error('Error fetching GitHub repos:', error);
            repoContainer.innerHTML = '<p class="section-subtitle" style="color: #ef4444;">Unable to load repositories at this time.</p>';
        });
});