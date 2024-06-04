// document.addEventListener('DOMContentLoaded', function() {
//     const mobileNav = document.querySelector('.mnav');
//     const closeBtn = document.querySelector('.mnav__close-btn');
//     const closeBtnIcn = document.querySelector('.mnav__close-btn-icon');

//     const navOpenedClass = 'left-0';
//     const navClosedClass = '-left-[300px]';
//     const arrowLeftClass = 'ri-arrow-left-s-line';
//     const arrowRightClass = 'ri-arrow-right-s-line';

//     if (closeBtn) {
//         closeBtn.addEventListener("click", () => {
//             if (mobileNav.classList.contains(navClosedClass)) {
//                 mobileNav.classList.remove(navClosedClass);
//                 mobileNav.classList.add(navOpenedClass);

//                 closeBtnIcn.classList.remove(arrowRightClass);
//                 closeBtnIcn.classList.add(arrowLeftClass);
//             } else {
//                 mobileNav.classList.remove(navOpenedClass);
//                 mobileNav.classList.add(navClosedClass);

//                 closeBtnIcn.classList.remove(arrowLeftClass);
//                 closeBtnIcn.classList.add(arrowRightClass);
//             }
//         });
//     } else {
//         console.error("El elemento .mnav__close-btn no se encontró en el documento.");
//     }
// });



 // Swiper
 const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    }
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hiddenElement');
hiddenElements.forEach((el) => observer.observe(el));

const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
        link.classList.add('active-link');
    }
});

// ScrollReveal
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '60px',
    duration: 700,
    delay: 70,
    reset: true
});

sr.reveal('.animacion', { origin: 'top' });
sr.reveal('.animacion2', { origin: 'bottom' });
sr.reveal('.animacion3', { origin: 'right' });

// Show hidden password
// const showHiddenPass = (loginPass, loginEye) => {
//     const input = document.getElementById(loginPass);
//     const iconEye = document.getElementById(loginEye);

//     if (input && iconEye) {
//         iconEye.addEventListener('click', () => {
//             if (input.type === 'password') {
//                 input.type = 'text';
//                 iconEye.classList.add('ri-eye-line');
//                 iconEye.classList.remove('ri-eye-off-line');
//             } else {
//                 input.type = 'password';
//                 iconEye.classList.remove('ri-eye-line');
//                 iconEye.classList.add('ri-eye-off-line');
//             }
//         });
//     } else {
//         console.error("Elementos para mostrar/ocultar contraseña no encontrados.");
//     }
// };

// showHiddenPass('login-pass', 'login-eye');

function initializeDropdownMenu() {
    const mobileNav = document.querySelector('.mnav');
    const closeBtn = document.querySelector('.mnav__close-btn');
    const closeBtnIcn = document.querySelector('.mnav__close-btn-icon');

    const navOpenedClass = 'left-0';
    const navClosedClass = '-left-[300px]';
    const arrowLeftClass = 'ri-arrow-left-s-line';
    const arrowRightClass = 'ri-arrow-right-s-line';

    if (closeBtn && closeBtnIcn && mobileNav) {
        closeBtn.addEventListener("click", () => {
            if (mobileNav.classList.contains(navClosedClass)) {
                mobileNav.classList.remove(navClosedClass);
                mobileNav.classList.add(navOpenedClass);
                closeBtnIcn.classList.remove(arrowRightClass);
                closeBtnIcn.classList.add(arrowLeftClass);
            } else {
                mobileNav.classList.remove(navOpenedClass);
                mobileNav.classList.add(navClosedClass);
                closeBtnIcn.classList.remove(arrowLeftClass);
                closeBtnIcn.classList.add(arrowRightClass);
            }
        });
    } else {
        // console.error("Algunos elementos no se encontraron en el documento.");
    }

   
}

// Llama a la función de inicialización después de que el DOM esté completamente cargado
initializeDropdownMenu();
