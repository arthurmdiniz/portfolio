document.addEventListener('DOMContentLoaded', function() {
    const GITHUB_USERNAME = 'arthurmdiniz';
    const projectsGrid = document.getElementById('projects-grid');

    loadProjects();
    setupNavigation();
    setupFilters();
    setupDarkMode();
    setupScrollAnimations();
    setupContactForm();

    function loadProjects() {
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar repositórios');
                }
                return response.json();
            })
            .then(repos => {
                displayProjects(repos);
            })
            .catch(error => {
                projectsGrid.innerHTML = '<p class="loading">Erro ao carregar projetos. Tente novamente mais tarde.</p>';
                console.error('Erro:', error);
            });
    }

    function displayProjects(repos) {
        if (repos.length === 0) {
            projectsGrid.innerHTML = '<p class="loading">Nenhum projeto encontrado.</p>';
            return;
        }

        const filteredRepos = repos.filter(repo => !repo.fork);

        projectsGrid.innerHTML = filteredRepos.map(repo => `
            <div class="project-card scroll-reveal" data-language="${repo.language || 'Outro'}">
                <div class="project-header">
                    <svg class="project-icon" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9z"></path>
                    </svg>
                    ${repo.stargazers_count > 0 ? `
                        <span class="project-stars">
                            <svg viewBox="0 0 16 16" width="16" height="16">
                                <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path>
                            </svg>
                            ${repo.stargazers_count}
                        </span>
                    ` : ''}
                </div>
                <a href="${repo.html_url}" target="_blank" class="project-title">${repo.name}</a>
                <p class="project-description">${repo.description || 'Sem descrição disponível.'}</p>
                <div class="project-footer">
                    <div class="project-language">
                        ${repo.language ? `
                            <span class="language-dot ${repo.language}"></span>
                            <span>${repo.language}</span>
                        ` : '<span>Linguagem não especificada</span>'}
                    </div>
                    <a href="${repo.html_url}" target="_blank" class="project-link">Ver mais →</a>
                </div>
            </div>
        `).join('');

        updateFilterButtons();
        setupScrollAnimations();
    }

    function setupFilters() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filter = this.dataset.filter;
                document.querySelectorAll('.project-card').forEach(card => {
                    if (filter === 'all' || card.dataset.language === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    function updateFilterButtons() {
        const languages = new Set();
        document.querySelectorAll('.project-card').forEach(card => {
            const lang = card.dataset.language;
            if (lang && lang !== 'Outro') {
                languages.add(lang);
            }
        });

        const filtersContainer = document.querySelector('.projects-filters');
        const existingBtns = filtersContainer.querySelectorAll('.filter-btn');

        existingBtns.forEach(btn => {
            if (btn.dataset.filter !== 'all') {
                btn.remove();
            }
        });

        languages.forEach(lang => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.dataset.filter = lang;
            btn.textContent = lang;
            filtersContainer.appendChild(btn);
        });

        setupFilters();
    }

    function setupNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    function setupDarkMode() {
        const themeToggle = document.getElementById('theme-toggle');
        const html = document.documentElement;
        
        const savedTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });

        function updateThemeIcon(theme) {
            const sunIcon = themeToggle.querySelector('.sun-icon');
            const moonIcon = themeToggle.querySelector('.moon-icon');
            
            if (theme === 'dark') {
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            } else {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            }
        }
    }

    function setupScrollAnimations() {
        const revealElements = document.querySelectorAll('.scroll-reveal');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    }

    function setupContactForm() {
        const form = document.getElementById('contact-form');
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;
                
                alert(`Obrigado, ${name}! Sua mensagem foi recebida. Entrarei em contato em breve.`);
                form.reset();
            });
        }
    }
});
