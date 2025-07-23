document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const offsetTop = targetElement.offsetTop - navbarHeight; // Adjust for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu after clicking a link
            if (document.querySelector('.nav-links').classList.contains('active')) {
                document.querySelector('.nav-links').classList.remove('active');
            }
        });
    });

    // Dynamic year for footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Toggle mobile navigation (burger menu)
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Animate sections on scroll using Intersection Observer
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.15 // When 15% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Add sticky effect to navbar on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) { // Adjust value as needed
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });

    // Typewriter effect for hero tagline
    const taglineText = "A passionate Web Developer creating beautiful and functional web experiences.";
    const typewriterElement = document.getElementById('typewriter-text');
    let i = 0;

    function typeWriter() {
        if (i < taglineText.length) {
            typewriterElement.innerHTML += taglineText.charAt(i);
            i++;
            setTimeout(typeWriter, 50); // Adjust typing speed
        }
    }
    // Start typing after a short delay for hero animation to settle
    setTimeout(typeWriter, 1200);

    // Basic form submission (for demonstration)
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent actual form submission

        // In a real project, you'd send this data to a backend (e.g., using fetch API)
        // For now, just an alert and form reset
        alert('Thank you for your message! I will get back to you soon.');
        this.reset(); // Clear the form fields
    });

    // Dark Mode / Light Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');

    // Apply saved theme on load
    if (currentTheme) {
        body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }
    } else {
        // Default to light mode if no preference is saved
        body.classList.remove('dark-mode');
        themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        let theme = 'light-mode';
        if (body.classList.contains('dark-mode')) {
            theme = 'dark-mode';
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        } else {
            themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
        }
        localStorage.setItem('theme', theme);
    });
});