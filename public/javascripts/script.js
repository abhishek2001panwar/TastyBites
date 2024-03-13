const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
    });
}

navSlide();
// Example code for search functionality
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    // Perform search logic here
});

// Example code for filtering recipes by category
const categoryButtons = document.querySelectorAll('.category-button');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        // Filter recipes by selected category
    });
});
window.addEventListener('DOMContentLoaded', () => {
    const menuItem = document.getElementById('menu-item');
    
    // Check if content exceeds the maximum height
    if (menuItem.scrollHeight > 400) {
      menuItem.classList.add('scrollable'); // Add the 'scrollable' class
    } else {
      menuItem.classList.remove('scrollable'); // Remove the 'scrollable' class if not needed
    }
  });
  ;