
const name = document.querySelector('.name');
const h1 = document.querySelector('h1');
const portfolioDiv = document.querySelector('div.portfolio');
const projects = document.querySelector('#projects');
const nav = document.querySelector('nav');
const hamburger = document.querySelector('.hamburger');
const closeIcon = document.querySelector('.close-icon');
const header = document.querySelector('header');
const article = document.querySelector('article');
const main = document.querySelector('main');
const headerChildren = document.querySelectorAll('header > *');
const arrow = document.querySelector('.arrow');
const footer = document.querySelector('footer');
const mouse = document.querySelector('.mouse');

const funFacts = [
    'creating animations',
    'swiss design',
    'taking naps',
    'tacos',
    'boba tea',
    '88rising',
    'to go bowling',
    'going on small walks',
    'to go rock climbing',
    'sipping on pho',
    'watching cat videos',
    'to code',
    'san serif typeface',
    'munching on powdered donuts',
];


// ------------------------- baffle components ------------------------- //

const options = {
    characters: '█▓▒░ ▒<▒▒ ░/█ ▒█<▓ ▒▓/▒█ ▓>░ ▒▓▒▓░ ▒▒<▓░ ▓░▓',
    speed: 90,
};

const h1Baff = baffle('h1', options);
const nameBaff = baffle(name, options);


// ------------------------- header animation sequence ------------------------- //

 // Immediately Invoked Function Expression
(function () { 
    h1Baff
        .start()
        .reveal(0, 1000);
    
    setTimeout(() => {
        h1Baff
            .start()
            .text(() => 'My name is')
            .reveal(0, 1000)
    }, 3000);

    setTimeout(() => {
        nameBaff
            .start()
            .reveal(0, 1000)
            .text(current => current + ' 😊')
        name.style.display = 'block';
    },4000);
 
})();

let prevFact;
let currentFact;
let stopLoop = false;
setTimeout(introLoop, 8000)


// ------------------------- functions ------------------------- //

function getRandom(max, min = 0) {
    return Math.floor(Math.random() * max + min)
}

function introLoop() {
    if (name.style.display === 'block') { // checks to see if intro sequence is finished
        if (stopLoop === true) { // if header portion is out of view then stop looping
            return;
        }
        setTimeout(() => {
            while (prevFact === currentFact) {
                currentFact = funFacts[getRandom(funFacts.length)];
            }
            prevFact = currentFact;
            h1Baff.text(() => 'I like');
            nameBaff.text(() => `${currentFact}!`).reveal(4000);
            setTimeout(introLoop, 4000)

        }, getRandom(8, 1) * 1000);
    }
}


// ------------------------- img hover effect ------------------------- //

portfolioDiv.addEventListener('mousemove', (e) => {

    // checks to see if value isn't blank
    if (e.target.dataset.img) { 
        const imgDataVal = e.target.dataset.img
        const h3 = document.querySelector(`[data-h3='${imgDataVal}']`)
        const h3Baff = baffle(h3, options);
        h3Baff
            .start()
            .text(() => `${imgDataVal}`)
            .reveal(0, 1000);
        e.target.dataset.img = '';
    };

    // img zoom effect relative to mouse position
    if (e.target.tagName === 'IMG') { 
        e.target.style.transformOrigin = `${e.offsetX}px ${e.offsetY}px`;
    }
    
});


// ------------------------- nav hover effect ------------------------- //

nav.addEventListener('mouseover', (e) => {
    mouse.classList.add('pulse-anim');
})

nav.addEventListener('mouseout', (e) => {
    mouse.classList.remove('pulse-anim');
})


// ------------------------- click functionality ------------------------- //

hamburger.addEventListener('click', function () {
    
    baffle('.container > h3', options).reveal(750, 0);
    baffle('article .email p', options).reveal(750, 400);
    baffle('article .social > p', options).reveal(750, 600);
    baffle('article .social a', options).reveal(750, 800);

    article.style.transform = 'translateX(0)';
    hamburger.style.display = 'none';
    arrow.style.display = 'none';

    // use to offset hamburger transition timing
    setTimeout(function() { 
        headerChildren[0].style.filter = 'blur(3px)';
    }, 
    350);

});

closeIcon.addEventListener('click', function() {
    
    article.style.transform = 'translateX(100%)'
    arrow.style.display = '';

    headerChildren[0].style.filter = '';
    hamburger.style.display = '';

});


// ------------------------- mouse function ------------------------- //

window.addEventListener('mousemove', function(e) {
    mouse.style.display = '';
    mouse.style.top = `${e.clientY}px`;
    mouse.style.left = `${e.clientX}px`;
});

// hides mouse when it leaves the window
window.addEventListener('mouseout', function() {
    mouse.style.display = 'none';
});


// ------------------------- arrow + hamburger style change ------------------------- //

window.addEventListener('scroll', function(e) {

    // mouse pos fixed on scroll
    mouse.style.position = 'fixed';

    const windowTopEdge = window.pageYOffset;
    const windowBottomEdge = window.pageYOffset + window.innerHeight;

    if (windowTopEdge >= main.offsetTop) {
        hamburger.style.color = '#2727e6'
    } else {
        hamburger.style.color = 'white'
    }

    if (windowBottomEdge > main.offsetTop && windowBottomEdge < footer.offsetTop) {
        arrow.style.display = 'none'
    } else if (windowBottomEdge <= main.offsetTop) {
        arrow.style.display = '';
        arrow.style.color = 'white';
        arrow.style.transform = 'rotate(-90deg)';
    } else if (windowBottomEdge >= footer.offsetTop) {
        arrow.style.display = '';
        arrow.style.color = '#2727e6';
        arrow.style.transform = 'rotate(90deg)';
    }

});


// ------------------------- intersection observer ------------------------- //

const observerOptions = {
    threshold: 0.25,
};

const observer = new IntersectionObserver(callback, observerOptions);
observer.observe(header);

function callback(entries) {
    // stops introLoop from running when a certain portion of the header is off screen
    entries.forEach(entry => {
        if (entry.intersectionRatio <= .25) {
            // console.log('stop loop');
            stopLoop = true;
        } else {
            // console.log('start loop');
            stopLoop = false; 
            introLoop();
        }
    })
};




