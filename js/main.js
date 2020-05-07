
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
let mouse = document.querySelector('.mouse');

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


// ------------------------- detect touch enabled device ------------------------- //

(function() {
    
    var check = false;
    (function(a){
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) 
            check = true;
    })(navigator.userAgent||navigator.vendor||window.opera);

    // removes mouse pointer and all functionality 
    if (check) {
        // mouse = null;
        mouse.style.display = 'none'
    }

})();

