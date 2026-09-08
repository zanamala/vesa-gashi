/* ==========================================================================
   VESA GASHI — MAKEUP ARTIST
   Interactive Controller & Navigation Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initPortfolioFilters();
  initLightboxModal();
  initScrollSpy();
  initContactForm();
});

/* --------------------------------------------------------------------------
   Header Background Transition on Scroll
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   Mobile Menu Drawer Toggle
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !drawer) return;

  function toggleMenu() {
    const isActive = menuBtn.classList.toggle('active');
    drawer.classList.toggle('active');
    menuBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    document.body.style.overflow = isActive ? 'hidden' : '';
  }

  menuBtn.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (drawer.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Portfolio Category Filtering
   -------------------------------------------------------------------------- */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (!filterBtns.length || !portfolioItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Active state on buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter portfolio items
      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   Portfolio Lightbox Modal Preview
   -------------------------------------------------------------------------- */
function initLightboxModal() {
  const modal = document.getElementById('lightbox-modal');
  const backdrop = document.getElementById('lightbox-backdrop');
  const closeBtn = document.getElementById('lightbox-close');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  const modalTitle = document.getElementById('modal-title');
  const modalSub = document.getElementById('modal-sub');
  const modalBadge = document.getElementById('modal-badge');

  if (!modal || !portfolioItems.length) return;

  function openModal(item) {
    const title = item.querySelector('.item-title')?.textContent || 'Work Title';
    const sub = item.querySelector('.item-sub')?.textContent || 'Category &bull; Details';
    const badge = item.querySelector('.placeholder-badge')?.textContent || 'PORTFOLIO';

    modalTitle.textContent = title;
    modalSub.innerHTML = sub;
    modalBadge.textContent = badge;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  portfolioItems.forEach(item => {
    item.addEventListener('click', () => openModal(item));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(item);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   ScrollSpy for Desktop Nav Active Link
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   Contact Page Form Handling
   -------------------------------------------------------------------------- */
function initContactForm() {
  const bookingForm = document.getElementById('booking-form');
  const successMsg = document.getElementById('form-success-message');

  if (!bookingForm || !successMsg) return;

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Show interactive success state
    successMsg.classList.add('active');
    bookingForm.reset();

    // Smooth scroll to success message
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

