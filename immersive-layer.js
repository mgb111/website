// immersive-layer.js
// Invisible tech layer: smooth scroll, custom cursor, tilt, decode text, scroll reveal

(function () {
  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  onReady(function () {
    // 1. Smooth Scroll with Lenis (if available globally)
    if (window.Lenis) {
      var lenis = new window.Lenis({
        smooth: true,
        smoothWheel: true,
        lerp: 0.08,
        wheelMultiplier: 0.9
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    // 2. Custom "scanner" cursor
    var cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    document.body.appendChild(cursor);

    var targetX = window.innerWidth / 2;
    var targetY = window.innerHeight / 2;
    var currentX = targetX;
    var currentY = targetY;
    var isDown = false;
    var isInteractive = false;

    function move(e) {
      targetX = e.clientX;
      targetY = e.clientY;
    }

    function loop() {
      var dx = targetX - currentX;
      var dy = targetY - currentY;
      currentX += dx * 0.18;
      currentY += dy * 0.18;
      cursor.style.transform = 'translate(' + currentX + 'px, ' + currentY + 'px) translate(-50%, -50%)';
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    function down() {
      isDown = true;
      cursor.classList.add('cursor-down');
    }
    function up() {
      isDown = false;
      cursor.classList.remove('cursor-down');
    }

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);

    var interactiveSelector = 'a, button, [role="button"], [data-cursor="interactive"]';

    document.addEventListener('mouseover', function (e) {
      var el = e.target;
      if (el && el.closest && el.closest(interactiveSelector)) {
        isInteractive = true;
        cursor.classList.add('cursor-interactive');
      }
    });

    document.addEventListener('mouseout', function (e) {
      var el = e.target;
      if (el && el.closest && el.closest(interactiveSelector)) {
        isInteractive = false;
        cursor.classList.remove('cursor-interactive');
      }
    });

    // Hide native cursor only on desktop sizes
    if (window.innerWidth >= 768) {
      document.body.classList.add('cursor-hidden-native');
    }

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) {
        document.body.classList.add('cursor-hidden-native');
      } else {
        document.body.classList.remove('cursor-hidden-native');
      }
    });

    // 3. Holographic tilt on cards
    var tiltSelectors = ['.project-card', '.feature-card', '.industry-card', '.blog-card', '.testimonial-card'];
    var tiltNodes = document.querySelectorAll(tiltSelectors.join(','));

    tiltNodes.forEach(function (card) {
      // Ensure glare element exists
      var glare = document.createElement('div');
      glare.className = 'tilt-glare';
      card.appendChild(glare);

      card.style.transformStyle = 'preserve-3d';

      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var percentX = (x / rect.width) - 0.5;
        var percentY = (y / rect.height) - 0.5;

        var rotateX = percentY * -10; // max 10deg
        var rotateY = percentX * 10;

        card.style.transition = 'transform 0.06s ease-out';
        card.style.transform = 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';

        var glareX = (percentX + 0.5) * 100;
        var glareY = (percentY + 0.5) * 100;
        glare.style.background = 'radial-gradient(circle at ' + glareX + '% ' + glareY + '%, rgba(255,255,255,0.4), transparent 60%)';
        glare.style.opacity = '0.5';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transition = 'transform 0.4s ease';
        card.style.transform = '';
        glare.style.opacity = '0';
      });
    });

    // 4. Data decode / text scramble for main headings
    var scrambleChars = '!@#$%^&*()_+{}[]<>?/\\|';

    function scrambleText(el, finalText, duration) {
      if (!finalText) return;
      var frame = 0;
      var totalFrames = Math.max(10, Math.floor((duration || 500) / 16));
      var length = finalText.length;

      var interval = setInterval(function () {
        frame++;
        var progress = frame / totalFrames;
        if (progress >= 1) {
          el.textContent = finalText;
          clearInterval(interval);
          return;
        }
        var current = '';
        for (var i = 0; i < length; i++) {
          if (i / length < progress) {
            current += finalText[i];
          } else {
            current += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          }
        }
        el.textContent = current;
      }, 16);
    }

    var decodeTargets = [];

    var heroH1 = document.querySelector('main h1');
    if (heroH1) {
      decodeTargets.push(heroH1);
    }

    var sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(function (el) { decodeTargets.push(el); });

    decodeTargets.forEach(function (el) {
      var original = el.getAttribute('data-decode-text') || el.textContent;
      el.setAttribute('data-decode-text', original || '');

      el.addEventListener('mouseenter', function () {
        scrambleText(el, original, 500);
      });
    });

    // 5. Scroll reveal + stagger
    var revealItems = [];

    var sections = document.querySelectorAll('main section');
    sections.forEach(function (section) {
      var children = section.querySelectorAll('[data-reveal], .project-card, .feature-card, .industry-card, .blog-card, .testimonial-card, .brands-logos .grid > div');
      if (!children.length) {
        revealItems.push(section);
      } else {
        children.forEach(function (child) {
          revealItems.push(child);
          child.classList.add('reveal-item');
        });
      }
    });

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var target = entry.target;
            target.classList.add('animate-fadeInUp');
            observer.unobserve(target);
          }
        });
      }, { threshold: 0.1 });

      revealItems.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      revealItems.forEach(function (el) {
        el.classList.add('animate-fadeInUp');
      });
    }
  });
})();
