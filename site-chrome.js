// site-chrome.js
// Renders a unified header and footer across all pages and wires up mobile menu behavior.

function renderHeader() {
  return `
    <header class="bg-blue-900 p-4 sticky top-0 z-50 shadow-xl">
      <div class="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
        <div class="flex items-center">
          <a href="index.html" class="flex items-center">
            <img src="majorbean-logoform.png" alt="majorbeam logo" class="mr-3 h-10 w-10 object-contain">
            <img src="majorbeam logotype.png" alt="majorbeam logotype" class="h-8 md:h-10 object-contain hidden sm:inline-block">
          </a>
        </div>
        <button id="mobile-menu-button" class="md:hidden text-white focus:outline-none" aria-label="Open menu">
          <i class="fas fa-bars text-2xl"></i>
        </button>
        <nav id="navigation" class="hidden w-full md:flex md:w-auto md:space-x-6 mt-4 md:mt-0">
          <a href="index.html" class="block md:inline-block py-2 px-4 text-white hover:text-blue-200 font-medium transition duration-300">Home</a>
          <a href="use-cases.html" class="block md:inline-block py-2 px-4 text-white hover:text-blue-200 font-medium transition duration-300">Applications</a>
          <a href="about.html" class="block md:inline-block py-2 px-4 text-white hover:text-blue-200 font-medium transition duration-300">About Us</a>
          <a href="contact.html" class="block md:inline-block py-2 px-4 text-white hover:text-blue-200 font-medium transition duration-300">Contact</a>
        </nav>
      </div>
    </header>
  `;
}

function renderFooter() {
  return `
    <footer class="bg-blue-900 text-blue-100">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid md:grid-cols-3 gap-12 py-16 md:justify-items-center">
          <div class="text-center">
            <div class="flex items-center mb-6">
              <img src="majorbean-logoform.png" alt="majorbeam logo" class="mr-3 h-10 w-10 object-contain">
              <img src="majorbeam logotype.png" alt="majorbeam logotype" class="h-8 md:h-10 object-contain hidden sm:inline-block">
            </div>
            <div class="flex space-x-4 hidden">
              <a href="#" class="text-blue-300 hover:text-white transition duration-300"><i class="fab fa-linkedin text-xl"></i></a>
              <a href="#" class="text-blue-300 hover:text-white transition duration-300"><i class="fab fa-twitter text-xl"></i></a>
              <a href="#" class="text-blue-300 hover:text-white transition duration-300"><i class="fab fa-instagram text-xl"></i></a>
              <a href="#" class="text-blue-300 hover:text-white transition duration-300"><i class="fab fa-youtube text-xl"></i></a>
            </div>
          </div>

          <div class="text-center">
            <h4 class="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul class="space-y-3">
              <li><a href="use-cases.html" class="hover:text-white transition duration-300">Applications</a></li>
              <li><a href="about.html" class="hover:text-white transition duration-300">About Us</a></li>
              <li><a href="contact.html" class="hover:text-white transition duration-300">Contact</a></li>
            </ul>
          </div>

          <div class="text-center">
            <h4 class="text-lg font-semibold mb-6 text-white">Contact Info</h4>
            <ul class="space-y-4">
              <li class="flex items-center"><i class="fas fa-phone mr-3 text-blue-300"></i><span>79774710892</span></li>
              <li class="flex items-center"><i class="fas fa-envelope mr-3 text-blue-300"></i><span>manishb@majorbeam.com</span></li>
              <li class="flex items-center"><i class="fas fa-map-marker-alt mr-3 text-blue-300"></i><span>Vashi, Navi Mumbai, India</span></li>
            </ul>
          </div>
        </div>
        <div class="py-6 border-t border-blue-800 text-center">
          <p>© 2025 majorbeam. All rights reserved. | Built with <i class="fas fa-heart text-red-500"></i> for immersive experiences</p>
        </div>
      </div>
    </footer>
  `;
}

(function initHeaderFooter() {
  function inject() {
    const headerMount = document.getElementById('site-header');
    const footerMount = document.getElementById('site-footer');
    if (headerMount) headerMount.innerHTML = renderHeader();
    if (footerMount) footerMount.innerHTML = renderFooter();

    // Wire up mobile menu after injection
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const navigation = document.getElementById('navigation');
    if (mobileMenuButton && navigation) {
      mobileMenuButton.addEventListener('click', function () {
        navigation.classList.toggle('hidden');
      });

      document.addEventListener('click', function (event) {
        if (!navigation.contains(event.target) && !mobileMenuButton.contains(event.target) && !navigation.classList.contains('hidden')) {
          navigation.classList.add('hidden');
        }
      });

      function syncMenuOnResize() {
        if (window.innerWidth >= 768) {
          navigation.classList.remove('hidden');
        } else {
          if (!navigation.classList.contains('hidden') && !mobileMenuButton.offsetParent) {
            navigation.classList.add('hidden');
          }
        }
      }
      window.addEventListener('resize', syncMenuOnResize);
      syncMenuOnResize();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
