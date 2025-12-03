// site-chrome.js
// Renders a unified header and footer across all pages and wires up mobile menu behavior.

function renderHeader() {
  return `
    <header class="bg-blue-900 py-5 pr-4 pl-0 sticky top-0 z-50 shadow-xl">
      <div class="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
        <div class="flex items-center ml-3 md:-ml-8">
          <a href="index.html" class="flex items-center">
            <img src="majorbean-logoform.png" alt="majorbeam logo" class="mr-4 md:mr-4 h-8 w-8 object-contain">
            <img src="majorbeam logotype.png" alt="majorbeam logotype" class="h-7 md:h-10 object-contain inline-block">
          </a>
        </div>
        <button id="mobile-menu-button" class="md:hidden text-white focus:outline-none" aria-label="Open menu">
          <i class="fas fa-bars text-2xl"></i>
        </button>
        <nav id="navigation" class="hidden w-full md:flex md:w-auto md:space-x-6 mt-4 md:mt-0">
          <a href="index.html" class="block md:inline-block py-2 px-4 text-white hover:text-blue-200 font-medium transition duration-300">Home</a>
          <a href="use-cases.html" class="block md:inline-block py-2 px-4 text-white hover:text-blue-200 font-medium transition duration-300">Solutions</a>
          <a href="about.html" class="block md:inline-block py-2 px-4 text-white hover:text-blue-200 font-medium transition duration-300">About Us</a>
          <a href="contact.html" class="block md:inline-block py-2 px-4 text-white hover:text-blue-200 font-medium transition duration-300">Contact</a>
        </nav>
      </div>
    </header>
  `;
}

function renderFooter() {
  return `
    <footer class="bg-blue-900 text-blue-100 leading-110">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-10 py-16 md:justify-items-center items-center">
          <div class="text-center col-span-2 md:col-span-1 order-1 justify-self-center">
            <div class="flex items-center justify-center mb-4 -mt-1">
              <img src="majorbean-logoform.png" alt="majorbeam logo" class="mr-4 md:mr-4 h-8 w-8 object-contain align-middle">
              <img src="majorbeam logotype.png" alt="majorbeam logotype" class="h-7 md:h-10 object-contain inline-block align-middle">
            </div>
            <div class="flex items-center justify-center space-x-6 mt-3">
              <a href="https://www.instagram.com/wearemajorbeam/" target="_blank" rel="noopener" aria-label="Instagram" class="text-blue-200 hover:text-white transition-colors duration-200">
                <i class="fa-brands fa-instagram text-2xl"></i>
              </a>
              <a href="https://x.com/wearemajorbeam" target="_blank" rel="noopener" aria-label="X (Twitter)" class="text-blue-200 hover:text-white transition-colors duration-200">
                <svg class="w-6 h-6" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">
                  <path d="M18.244 2H21.5l-7.5 8.573L23.5 22h-7.31l-5.72-6.74L3.06 22H.5l8.04-9.19L.5 2h7.42l5.17 6.09L18.244 2zm-1.23 18h2.04L7.05 4H4.9l12.114 16z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/majorbeam/?viewAsMember=true" target="_blank" rel="noopener" aria-label="LinkedIn" class="text-blue-200 hover:text-white transition-colors duration-200">
                <i class="fa-brands fa-linkedin-in text-2xl"></i>
              </a>
              <a href="https://www.facebook.com/people/majorbeam/61581545441086/" target="_blank" rel="noopener" aria-label="Facebook" class="text-blue-200 hover:text-white transition-colors duration-200">
                <i class="fa-brands fa-facebook-f text-2xl"></i>
              </a>
            </div>
          </div>

          <div class="text-right justify-self-end order-3 md:order-2 md:text-left md:justify-self-auto">
            <h4 class="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul class="space-y-3 inline-block text-right md:text-left">
              <li><a href="use-cases.html" class="hover:text-white transition duration-300">Solutions</a></li>
              <li><a href="about.html" class="hover:text-white transition duration-300">About Us</a></li>
              <li><a href="contact.html" class="hover:text-white transition duration-300">Contact</a></li>
            </ul>
          </div>

          <div class="text-left order-2 md:order-3">
            <h4 class="text-lg font-semibold mb-6 text-white">Contact Info</h4>
            <ul class="space-y-3 inline-block text-left">
              <li><span>79774710892</span></li>
              <li><span>manishb@majorbeam.com</span></li>
              <li><span>Vashi, Navi Mumbai, India</span></li>
            </ul>
          </div>
        </div>
        <div class="py-6 border-t border-blue-800 text-center">
          <p>© 2025 majorbeam. All rights reserved.</p>
          <p>Built with <i class="fas fa-heart text-red-500"></i> for immersive experiences</p>
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
