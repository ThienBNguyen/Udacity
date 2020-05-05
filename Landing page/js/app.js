// create a scroll event with the dom
const navLink = document.querySelector('#navbar__list').children;
const sectionList = document.querySelectorAll('section');
let listLink = document.querySelectorAll('#navbar__list a');
const navBar = document.querySelector('.page__header');
let timeout;

//when click nav the page will navigate to that section with smooth effect
for (let i = 0; i < navLink.length; i++) {
  //add smooth style to html when click navbar
  navLink[i].addEventListener('click', function () {
    document.documentElement.style.scrollBehavior = 'smooth';
  });
}
function onScroll() {
  //when scroll through the section if the section in the viewport of the window than each section will add active class to the section
  let scrollPos = //find the display port of the window
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;

  for (let i = 0; i < listLink.length; i++) {
    let currLink = listLink[i];
    let currSection = sectionList[i];
    let val = currLink.getAttribute('href');
    let refElement = document.querySelector(val);
    if (
      refElement.offsetTop <= scrollPos &&
      refElement.offsetTop + refElement.offsetHeight > scrollPos
    ) {
      currLink.classList.add('nav-bar');
      currSection.classList.add('your-active-class');
    } else {
      currLink.classList.remove('nav-bar');
      currSection.classList.remove('your-active-class');
    }
  }
  // remove nav bar when the mouse is not moving
  navBar.style.display = 'block';
  clearTimeout(timeout);
  timeout = setTimeout(function () {
    navBar.style.display = 'none';
  }, 5000);
}

window.document.addEventListener('scroll', onScroll); //run tge onscroll  function and select scroll on window
