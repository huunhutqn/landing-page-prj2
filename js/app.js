/**
 *
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
 *
 */
/** Get Sections */
const sections = document.querySelectorAll("[id^=section]");
/** Get Navbar */
const navbar = document.getElementById("navbar__list");
/** Scrolling flag */
let isDoneScroll = true;
let sectionIdActive = 1;
let timeoutScroll;
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
for (const section of sections) {
  // Create navbar's item
  const navbarItem = document.createElement("li");
  const navbarItemClassId = "menu__link--" + section.id.replace("section", "");
  navbarItem.classList.add("menu__link", navbarItemClassId);
  // Default first navbar item is actived
  if (section.id.replace("section", "") == 1) {
    navbarItem.classList.add("active");
  }
  // Set navbar item's name by get data-nav attribute of section
  navbarItem.innerHTML = section.dataset.nav;

  // Add event scroll to section by click nav item
  navbarItem.addEventListener("click", function (event) {
    // Prevent handle scroll event
    clearTimeout(timeoutScroll);
    isDoneScroll = false;

    document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });

    const navItemsTmp = document.getElementsByClassName("menu__link");
    for (const navItemTmp of navItemsTmp) {
      if (!navItemTmp.classList.contains(navbarItemClassId)) {
        navItemTmp.classList.remove("active");
      }
    }
    navbarItem.classList.add("active");

    for (const sectionTmp of sections) {
      sectionTmp.classList.remove("active");
    }
    section.classList.add("active");

    timeoutScroll = setTimeout(() => {
      // Wait for scroll is done
      isDoneScroll = true;
    }, 800);
  });

  // Append navbar item to navbar
  navbar.appendChild(navbarItem);
}

/** Get navbar items */
const navItems = document.getElementsByClassName("menu__link");

// Add class 'active' to section when near top of viewport
document.addEventListener("scroll", function (event) {
  if (isDoneScroll) {
    setActiveClass();
  }
});

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active
function setActiveClass() {
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const navbarItem = document.querySelector(
      ".menu__link--" + section.id.replace("section", "")
    );
    const sectionIdActiveTmp = section.id.replace("section", "");
    const sectionRect = section.getBoundingClientRect();
    if (sectionRect.top < 300 && sectionRect.bottom > 300) {
      // Check from the first section to the end
      section.classList.add("active");
      sectionIdActive = sectionIdActiveTmp;
      navbarItem?.classList.add("active");
    } else if (i == 0 && sectionRect.top > 300 && sectionRect.bottom > 300) {
      // Check above the first section
      section.classList.add("active");
      sectionIdActive = sectionIdActiveTmp;
      navbarItem?.classList.add("active");
    } else if (
      i == sections.length - 1 &&
      sectionRect.top < 300 &&
      sectionRect.bottom > 300
    ) {
      // Check below the end section
      section.classList.add("active");
      sectionIdActive = sectionIdActiveTmp;
      navbarItem?.classList.add("active");
    } else {
      section.classList.remove("active");
      navbarItem?.classList.remove("active");
    }
  }
}

// Reset active class if refresh page
document.addEventListener("load", () => {
  setActiveClass();
});
