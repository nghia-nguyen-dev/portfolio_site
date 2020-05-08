const hamburger = document.querySelector('.hamburger');
const closeIcon = document.querySelector('.close-icon');
const article = document.querySelector('article');
const arrow = document.querySelector('.arrow');
const content = document.querySelector('.content')
const mouse = document.querySelector('.mouse');
const nav = document.querySelector('nav');


// ------------------------- mouse follow ------------------------- //

window.addEventListener('mousemove', function(e) {
    mouse.style.display = '';
    mouse.style.top = `${e.clientY}px`;
    mouse.style.left = `${e.clientX}px`;
});

// hides mouse when it leaves the window
window.addEventListener('mouseout', function() {
    mouse.style.display = 'none';
});

window.addEventListener('scroll', function() {
     // this makes it so the mouse icon stays put on scroll
    mouse.style.position = 'fixed';
});


// ------------------------- click functionality ------------------------- //

const options = {
    characters: '█▓▒░ ▒<▒▒ ░/█ ▒█<▓ ▒▓/▒█ ▓>░ ▒▓▒▓░ ▒▒<▓░ ▓░▓',
    speed: 90,
};

hamburger.addEventListener('click', function () {
    
    baffle('.container > h3', options).reveal(750, 0);
    baffle('article .email p', options).reveal(750, 400);
    baffle('article .social > p', options).reveal(750, 600);
    baffle('article .social a', options).reveal(750, 800);
    
    article.style.transform = 'translateX(0)';
    hamburger.style.display = 'none';
    arrow.style.display = 'none';

    // use delay to offset hamburger transition timing
    setTimeout(function() { 
        content.style.filter = 'blur(3px)';
    }, 
    350);
});

closeIcon.addEventListener('click', function() {
    article.style.transform = 'translateX(100%)'
    arrow.style.display = '';

    content.style.filter = '';
    hamburger.style.display = '';
});

// ------------------------- nav hover effect ------------------------- //

nav.addEventListener('mouseover', () => {
    mouse.classList.add('pulse-anim');
});

nav.addEventListener('mouseout', () => {
    mouse.classList.remove('pulse-anim');
});


