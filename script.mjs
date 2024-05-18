/* Lab 316.1 */

// Menu data structure
var menuLinks = [
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];
  
let mainEl = document.getElementsByTagName('main');

mainEl[0].style.backgroundColor = 'var(--main-bg)';

mainEl[0].innerHTML = '<h1>DOM Manipulation</h1>';

mainEl[0].classList.add('flex-ctr');

// Part 2

let topMenuEl = document.getElementById('top-menu');

topMenuEl.style.height = '100%';

topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';

topMenuEl.classList.add('flex-around');

// Part 3

menuLinks.forEach(function(link) {

    let linkElement = document.createElement('a');

    linkElement.setAttribute('href', link.href);
        // linkElement.href = link.href;

    linkElement.textContent = link.text
    
    linkElement.textContent = link.text;

    topMenuEl.appendChild(linkElement);
  });

/* Lab 316.3 Graded ! */

/* Part 3 */

// Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl.
let subMenuEl = document.getElementById('sub-menu');

// Set the height subMenuEl element to be "100%".
subMenuEl.style.height = '100%';

// Set the background color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property.
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg';

// Add the class of flex-around to the subMenuEl element.
subMenuEl.classList.add('flex-around');

// Set the CSS position property of subMenuEl to the value of absolute.
subMenuEl.style.position = 'absolute';

// Set the CSS top property of subMenuEl to the value of 0.
subMenuEl.style.top = 0;

/* Part 4 */

// Select and cache the all of the <a> elements inside of topMenuEl in a variable named topMenuLinks.
let topMenuLinks = document.querySelectorAll('#top-menu a');

// Attach a delegated 'click' event listener to topMenuEl.
topMenuLinks.forEach(function(link) {
  link.addEventListener('click', function(event) {

    // The first line of code of the event listener function should call the event object's preventDefault() method.
    event.preventDefault();

    // The second line of code of the function should immediately return if the element clicked was not an <a> element.
    if (event.target.tagName !== 'A') {
      return;
    }

    // Log the content of the <a> to verify the handler is working.
    console.log(event.target.textContent);

    // The event listener should add the active class to the <a> element that was clicked, unless it was already active, in which case it should remove it.
    // The event listener should remove the active class from each other <a> element in topMenuLinks - whether the active class exists or not.
    topMenuLinks.forEach(function(link) {
      link.classList.remove('active');
    });

    if (!event.target.classList.contains('active')) {
      event.target.classList.add('active');
    }

    /* Part 5 A */

    let linkObject = menuLinks.find(linkObj => linkObj.text === event.target.textContent);

    // If the clicked <a> element's "link" object within menuLinks has a subLinks property (all do, except for the "link" object for ABOUT), set the CSS top property of subMenuEl to 100%.
    if (linkObject && linkObject.subLinks) {
      subMenuEl.style.top = '100%';

      // Clear the current contents of subMenuEl.
      subMenuEl.innerHTML = ''; 

      // Iterate over the subLinks array, passed as an argument, and for each "link" object:
      linkObject.subLinks.forEach(function (subLink) {

      // Create an <a> element.
      let subLinkElement = document.createElement('a');

      // Add an href attribute to the <a>, with the value set by the href property of the "link" object.
      subLinkElement.setAttribute('href', subLink.href);
      
      // Set the element's content to the value of the text property of the "link" object.
      subLinkElement.textContent = subLink.text;

      // Append the new element to the subMenuEl.
      subMenuEl.appendChild(subLinkElement);
      });

    } else {

      // Otherwise, set the CSS top property of subMenuEl to 0.
      subMenuEl.style.top = 0;
    }

   });
});

// Part 5 B

  // Attach a delegated 'click' event listener to subMenuEl.
  subMenuEl.addEventListener('click', function(event) {

    // The first line of code of the event listener function should call the event object's preventDefault() method.
    event.preventDefault();
    
    // The second line of code within the function should immediately return if the element clicked was not an <a> element.
    if (event.target.tagName !== 'A') {
      return;
    }

    // Log the content of the <a> to verify the handler is working.
    console.log(event.target.textContent);

    // Next, the event listener should set the CSS top property of subMenuEl to 0.
    subMenuEl.style.top = 0;

    // Remove the active class from each <a> element in topMenuLinks.
    topMenuLinks.forEach(function(link) {
      link.classList.remove('active');
    });

    // Update the contents of mainEl, within an <h1>, to the contents of the <a> element clicked within subMenuEl.
    mainEl[0].innerHTML = `<h1>${event.target.textContent}</h1>`;

    // If the ABOUT link is clicked, an <h1>About</h1> should be displayed.
    if (event.target.textContent === 'about') {
      mainEl[0].innerHTML = '<h1>About</h1>';
    }
});