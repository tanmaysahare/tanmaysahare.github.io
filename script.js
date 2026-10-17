document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle. The saved theme is applied by an inline script in <head> before first paint;
    // this only keeps the button's icon and pressed state in step with it.
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const icon = themeToggle.querySelector('i');

    function updateThemeToggle(theme) {
        const dark = theme === 'dark';
        icon.classList.toggle('fa-sun', dark);
        icon.classList.toggle('fa-moon', !dark);
        themeToggle.setAttribute('aria-pressed', String(dark));
    }

    updateThemeToggle(htmlElement.getAttribute('data-theme'));

    themeToggle.addEventListener('click', () => {
        const newTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        try {
            localStorage.setItem('theme', newTheme);
        } catch (e) {
            // Private mode or blocked storage: the theme still changes for this visit.
        }
        updateThemeToggle(newTheme);
    });

    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    function setMenu(open) {
        navLinks.classList.toggle('active', open);
        navToggle.setAttribute('aria-expanded', String(open));
        navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    navToggle.addEventListener('click', () => {
        setMenu(!navLinks.classList.contains('active'));
    });

    // Close the mobile menu when a link is chosen or Escape is pressed
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => setMenu(false));
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            setMenu(false);
            navToggle.focus();
        }
    });

    // In-page links scroll natively: CSS sets scroll-padding for the fixed navbar and smooth
    // scrolling only when the visitor has not asked for reduced motion.
});
