// ======================================================
// 1. CURSEUR PAPILLON
// ======================================================
const bfMain = document.getElementById('bf-main');

if (bfMain) {
    document.addEventListener('mousemove', e => {
        bfMain.style.left = e.clientX + 'px';
        bfMain.style.top = e.clientY + 'px';
    });
}

// ======================================================
// 2. NAVIGATION ADAPTIVE & CHANGEMENT DE LOGO
// ======================================================
const nav = document.getElementById('nav');
const navLogo = document.getElementById('nav-logo');
const sections = document.querySelectorAll('section');

if (nav && navLogo) {
    window.addEventListener('scroll', () => {
        let currentTheme = "dark";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= (sectionTop - 150)) {
                currentTheme = section.getAttribute('data-theme');
            }
        });

        const isProjectFolder = window.location.pathname.includes('/projets/');
        const pathPrefix = isProjectFolder ? '../images/' : 'images/';

        if (currentTheme === 'light') {
            nav.classList.add('light');
            nav.classList.remove('dark');
            navLogo.src = pathPrefix + 'logo-prune.png';
        } else {
            nav.classList.add('dark');
            nav.classList.remove('light');
            navLogo.src = pathPrefix + 'logo-blanc.png';
        }

        if (window.scrollY > 60) {
            nav.style.padding = '1rem 5vw';
        } else {
            nav.style.padding = '1.5rem 5vw';
        }
    }, { passive: true });
}

// ======================================================
// 3. MENU BURGER
// ======================================================
const burger = document.getElementById('burger');
const navMenu = document.getElementById('nav-menu');
const menuClose = document.getElementById('menu-close');

if (burger && navMenu) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });
}

if (menuClose && burger && navMenu) {
    menuClose.addEventListener('click', () => {
        burger.classList.remove('open');
        navMenu.classList.remove('open');
    });
}

// ======================================================
// 4. APPARITION DES SECTIONS (FADE-IN)
// ======================================================
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade').forEach(el => {
    observer.observe(el);
});

// ======================================================
// 5. SYSTÈME LIGHTBOX AVEC NAVIGATION
// ======================================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lbCounter = document.getElementById('lightbox-counter');
const zoomables = [...document.querySelectorAll('.zoomable')];
let current = 0;

if (lightbox && lightboxImg) {

    function openLightbox(index) {
        current = index;
        lightboxImg.src = zoomables[current].querySelector('img').src;
        lbCounter.textContent = (current + 1) + ' / ' + zoomables.length;
        lightbox.style.display = 'flex';
        setTimeout(() => lightbox.classList.add('active'), 10);
        if (bfMain) bfMain.style.opacity = '1';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.style.display = 'none';
            lightboxImg.src = '';
        }, 400);
    }

    function navigate(dir) {
        current = (current + dir + zoomables.length) % zoomables.length;
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.src = zoomables[current].querySelector('img').src;
            lbCounter.textContent = (current + 1) + ' / ' + zoomables.length;
            lightboxImg.style.opacity = '1';
        }, 180);
    }

    zoomables.forEach((el, i) => el.addEventListener('click', () => openLightbox(i)));

    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-arrow.prev').addEventListener('click', () => navigate(-1));
    document.querySelector('.lightbox-arrow.next').addEventListener('click', () => navigate(1));

    lightbox.addEventListener('click', e => {
        if (e.target !== lightboxImg && !e.target.classList.contains('lightbox-arrow')) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'ArrowLeft')  navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
        if (e.key === 'Escape')     closeLightbox();
    });
}