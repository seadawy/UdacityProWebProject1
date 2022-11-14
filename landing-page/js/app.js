/**
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 */
const nav = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

onscroll = function() {
    var scrollPosition = document.documentElement.scrollTop;

    sections.forEach(function(section) {
        if (
            scrollPosition >= section.offsetTop - section.offsetHeight * 0.25 &&
            scrollPosition < section.offsetTop + section.offsetHeight - section.offsetHeight * 0.25
        ) {
            var id = section.getAttribute('id');
            setActive('#' + id, 'a');
            setActive('#' + id, 'section');
        }
    });
};


/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function buildNav() {
    for (let index = 1; index <= sections.length; index++) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.classList.add('menu__link');
        a.setAttribute('id', 'section' + index);
        a.textContent = "Section " + index;
        li.appendChild(a);
        nav.appendChild(li);
    }
}
// Add class 'active' to section when near top of viewport
function setActive(x, y) {
    let id = document.querySelector(y + x)
    let all = document.querySelectorAll(y);
    console.log(id);
    console.log(all);
    all.forEach(ele => {
        if (id === ele) {
            ele.classList.add('active');
        } else {
            ele.classList.remove('active');
        }
    });
}
// Scroll to anchor ID using scrollTO event

nav.addEventListener('click', function(e) {
    let id = e.target.getAttribute('id');
    let goto = document.querySelector('section#' + id);
    goto.scrollIntoView({ behavior: "smooth" });
    setActive('#' + id, 'a');
    setActive('#' + id, 'section');
});

/**
 * End Main Functions
 * Begin Events
 */

// Build menu 
buildNav();
setActive('#section1', 'a');
// Scroll to section on link click

// Set sections as active