// Dark Mode Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const bodyElement = document.body;

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = bodyElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
        bodyElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.textContent = 'Light Mode';
    } else {
        bodyElement.setAttribute('data-theme', 'light');
        themeToggleBtn.textContent = 'Dark Mode';
    }
});

// Mobile Menu Toggle Logic
const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
const sidebar = document.getElementById('sidebar');

mobileMenuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Live Clock Logic (BST - London Timezone)
function updateClock() {
    const timeElement = document.getElementById('local-time');
    if (timeElement) {
        const now = new Date();
        const options = {
            timeZone: 'Europe/London',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        const formatter = new Intl.DateTimeFormat('en-GB', options);
        timeElement.textContent = formatter.format(now).toUpperCase() + ' BST';
    }
}

updateClock();
setInterval(updateClock, 1000);

// Dynamic Sidebar Navigation Logic
const sections = document.querySelectorAll('.portfolio-section');
const navLinks = document.querySelectorAll('#sidebar nav ul li a');

const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -80% 0px', 
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active-nav');
                
                if (link.getAttribute('href').substring(1) === entry.target.id) {
                    link.classList.add('active-nav');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));