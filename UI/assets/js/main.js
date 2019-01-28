const menuToggle = document.querySelector('.menu-toggle'); // Menu Toggle
const navBar = document.querySelector('nav'); // Menu Toggle
const sideNav = document.querySelector('.sidenav'); // ADMIN BAR TOGGLE
const adminToggle = document.querySelector('.admin-toggle'); // ADMIN BAR TOGGLE
const closebtn = document.querySelector('.closebtn'); // ADMIN BAR TOGGLE

function openNav() {
  sideNav.style.width = '200px';
}

function closeNav() {
  sideNav.style.width = '0';
}

// MENU TOGGLE
if (menuToggle && navBar) {
  menuToggle.addEventListener('click', () => {
    navBar.classList.toggle('active');
  });
}

if (menuToggle && navBar && sideNav && adminToggle && closebtn) {
  menuToggle.addEventListener('click', () => {
    closeNav();
  });
}

// ADMIN BAR TOGGLE
if (sideNav && adminToggle && closebtn) {
  adminToggle.addEventListener('click', () => {
    openNav();
  });
  closebtn.addEventListener('click', () => {
    closeNav();
  });
}
