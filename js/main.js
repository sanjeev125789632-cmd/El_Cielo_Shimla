/**
 * El Cielo Shimla - Interactive Logic & UI Controller
 * Heaven in the Hills | Dhanda/Totu, Shimla
 */

document.addEventListener('DOMContentLoaded', () => {
  initDatePickers();
  initStickyHeader();
  initMobileDrawer();
  initScrollSpy();
  initRoomModals();
  initTestimonialCarousel();
  initGalleryFilterAndLightbox();
  initDirectBookingForm();
  initHouseRulesModal();
  initBackToTop();
  initFloatingWhatsApp();
  initMobileBottomBar();
  initYear();
});

/* --- 1. Dynamic Date Initializer --- */
function initDatePickers() {
  const today = new Date();
  
  // Tomorrow for check-in
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Day after tomorrow for check-out
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 3);

  const formatDate = (d) => d.toISOString().split('T')[0];

  const heroCheckin = document.getElementById('checkinDate');
  const heroCheckout = document.getElementById('checkoutDate');
  const formCheckin = document.getElementById('formCheckin');
  const formCheckout = document.getElementById('formCheckout');

  const tomorrowStr = formatDate(tomorrow);
  const dayAfterStr = formatDate(dayAfter);

  if (heroCheckin) {
    heroCheckin.min = formatDate(today);
    heroCheckin.value = tomorrowStr;
    heroCheckin.addEventListener('change', () => {
      if (heroCheckout) {
        heroCheckout.min = heroCheckin.value;
        if (heroCheckout.value <= heroCheckin.value) {
          const nextDay = new Date(heroCheckin.value);
          nextDay.setDate(nextDay.getDate() + 1);
          heroCheckout.value = formatDate(nextDay);
        }
      }
    });
  }

  if (heroCheckout) {
    heroCheckout.min = tomorrowStr;
    heroCheckout.value = dayAfterStr;
  }

  if (formCheckin) {
    formCheckin.min = formatDate(today);
    formCheckin.value = tomorrowStr;
    formCheckin.addEventListener('change', () => {
      if (formCheckout) {
        formCheckout.min = formCheckin.value;
        if (formCheckout.value <= formCheckin.value) {
          const nextDay = new Date(formCheckin.value);
          nextDay.setDate(nextDay.getDate() + 1);
          formCheckout.value = formatDate(nextDay);
        }
      }
    });
  }

  if (formCheckout) {
    formCheckout.min = tomorrowStr;
    formCheckout.value = dayAfterStr;
  }
}

/* --- 2. Sticky Header Controller --- */
function initStickyHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* --- 3. Mobile Navigation Drawer --- */
function initMobileDrawer() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const backdrop = document.getElementById('mobileBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    menuBtn.classList.add('active');
    menuBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    menuBtn.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function toggleDrawer() {
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  menuBtn.addEventListener('click', toggleDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Touch swipe to close drawer (swipe right towards edge)
  let touchStartX = 0;
  let touchCurrentX = 0;

  drawer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  drawer.addEventListener('touchmove', (e) => {
    touchCurrentX = e.touches[0].clientX;
  }, { passive: true });

  drawer.addEventListener('touchend', () => {
    // If swiped right by more than 50px
    if (touchCurrentX - touchStartX > 50 && touchStartX > 0) {
      closeDrawer();
    }
    touchStartX = 0;
    touchCurrentX = 0;
  }, { passive: true });
}

/* --- 4. ScrollSpy Navigation Highlighting --- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* --- 5. Hero Booking Bar Submission --- */
window.handleBookingBarSearch = function() {
  const checkin = document.getElementById('checkinDate')?.value;
  const checkout = document.getElementById('checkoutDate')?.value;
  const guests = document.getElementById('guestCount')?.value;
  const room = document.getElementById('roomPref')?.value;

  // Pre-fill direct booking form below
  const formCheckin = document.getElementById('formCheckin');
  const formCheckout = document.getElementById('formCheckout');
  const formGuests = document.getElementById('formGuests');
  const formRoomType = document.getElementById('formRoomType');

  if (formCheckin && checkin) formCheckin.value = checkin;
  if (formCheckout && checkout) formCheckout.value = checkout;

  if (formGuests && guests) {
    if (guests === '1') formGuests.value = '1 Adult';
    else if (guests === '2') formGuests.value = '2 Adults';
    else if (guests === '3') formGuests.value = '3 Adults';
    else formGuests.value = '4+ Adults / Family';
  }

  if (formRoomType && room) {
    formRoomType.value = room;
  }

  // Smooth scroll to booking section
  const bookingSec = document.getElementById('booking-section');
  if (bookingSec) {
    bookingSec.scrollIntoView({ behavior: 'smooth' });
    showToast(`Dates selected: ${checkin} to ${checkout}. Fill details to inquire with host!`, 'info');
  }
};

/* --- 6. Room Details Modal & Quick Reserve --- */
function initRoomModals() {
  const modal = document.getElementById('roomDetailModal');
  const closeBtn = document.getElementById('closeRoomModalBtn');
  const closeActionBtn = document.getElementById('closeModalActionBtn');
  const bookNowBtn = document.getElementById('modalBookNowBtn');

  const modalImg = document.getElementById('modalRoomImg');
  const modalPrice = document.getElementById('modalRoomPrice');
  const modalName = document.getElementById('modalRoomName');
  const modalCapacity = document.getElementById('modalRoomCapacity');
  const modalSize = document.getElementById('modalRoomSize');
  const modalDesc = document.getElementById('modalRoomDesc');
  const modalFeaturesGrid = document.getElementById('modalFeaturesGrid');

  if (!modal) return;

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (closeActionBtn) closeActionBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Open modal buttons
  document.querySelectorAll('.open-room-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.roomName;
      const price = btn.dataset.roomPrice;
      const capacity = btn.dataset.roomCapacity;
      const size = btn.dataset.roomSize;
      const img = btn.dataset.roomImg;
      const desc = btn.dataset.roomDesc;
      const features = (btn.dataset.roomFeatures || '').split(',');

      if (modalName) modalName.textContent = name;
      if (modalPrice) modalPrice.textContent = `${price} / night`;
      if (modalCapacity) modalCapacity.textContent = `👥 ${capacity}`;
      if (modalSize) modalSize.textContent = `📐 ${size}`;
      if (modalImg) modalImg.src = img;
      if (modalDesc) modalDesc.textContent = desc;

      if (modalFeaturesGrid) {
        modalFeaturesGrid.innerHTML = '';
        features.forEach(feat => {
          const item = document.createElement('div');
          item.className = 'modal-feat-item';
          item.innerHTML = `<span style="color:#C5A059;">✓</span> <span>${feat.trim()}</span>`;
          modalFeaturesGrid.appendChild(item);
        });
      }

      if (bookNowBtn) {
        bookNowBtn.onclick = () => {
          closeModal();
          prefillRoomInForm(name);
        };
      }

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  // Quick Reserve buttons on room cards
  document.querySelectorAll('.prefill-room-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const roomTitle = btn.dataset.roomTitle;
      prefillRoomInForm(roomTitle);
    });
  });

  function prefillRoomInForm(roomName) {
    const bookingSec = document.getElementById('booking-section');
    const formRoomType = document.getElementById('formRoomType');

    if (formRoomType && roomName) {
      // Find matching option
      for (let option of formRoomType.options) {
        if (option.value.toLowerCase().includes(roomName.toLowerCase()) || 
            roomName.toLowerCase().includes(option.value.toLowerCase())) {
          formRoomType.value = option.value;
          break;
        }
      }
    }

    if (bookingSec) {
      bookingSec.scrollIntoView({ behavior: 'smooth' });
      const nameInput = document.getElementById('formFullName');
      if (nameInput) setTimeout(() => nameInput.focus(), 600);
      showToast(`Selected: ${roomName}. Fill in your details below.`, 'info');
    }
  }
}

/* --- 7. Testimonials Carousel --- */
function initTestimonialCarousel() {
  const track = document.getElementById('testimonialTrack');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('prevReviewBtn');
  const nextBtn = document.getElementById('nextReviewBtn');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const wrapper = document.getElementById('testimonialCarousel');

  if (!track || !slides.length) return;

  let currentIndex = 0;
  let autoplayInterval;

  function updateSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentIndex = index;

    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentIndex);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      updateSlide(currentIndex - 1);
      resetAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      updateSlide(currentIndex + 1);
      resetAutoplay();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slideIndex = parseInt(dot.dataset.slide, 10);
      updateSlide(slideIndex);
      resetAutoplay();
    });
  });

  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      updateSlide(currentIndex + 1);
    }, 6000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  if (wrapper) {
    wrapper.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    wrapper.addEventListener('mouseleave', startAutoplay);
  }

  // Swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      updateSlide(currentIndex + 1);
      resetAutoplay();
    } else if (touchEndX - touchStartX > 50) {
      updateSlide(currentIndex - 1);
      resetAutoplay();
    }
  }, { passive: true });

  startAutoplay();
}

/* --- 8. Filterable Gallery & Fullscreen Lightbox --- */
function initGalleryFilterAndLightbox() {
  const filterBtns = document.querySelectorAll('#galleryFilters .filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.dataset.filter;

      galleryItems.forEach(item => {
        const itemCat = item.dataset.category;
        if (filterVal === 'all' || itemCat === filterVal) {
          item.style.display = 'block';
          item.style.animation = 'fadeUp 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('closeLightboxBtn');
  const prevBtn = document.getElementById('lightboxPrevBtn');
  const nextBtn = document.getElementById('lightboxNextBtn');

  if (!lightbox) return;

  let currentGalleryIndex = 0;
  let visibleItems = [];

  function getVisibleItems() {
    return Array.from(galleryItems).filter(item => item.style.display !== 'none');
  }

  function openLightbox(index) {
    visibleItems = getVisibleItems();
    if (!visibleItems.length) return;

    if (index < 0) index = visibleItems.length - 1;
    if (index >= visibleItems.length) index = 0;
    currentGalleryIndex = index;

    const item = visibleItems[currentGalleryIndex];
    const src = item.dataset.src || item.querySelector('img').src;
    const caption = item.dataset.caption || '';

    lightboxImg.src = src;
    lightboxCaption.textContent = caption;

    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      visibleItems = getVisibleItems();
      const index = visibleItems.indexOf(item);
      openLightbox(index !== -1 ? index : 0);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => openLightbox(currentGalleryIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => openLightbox(currentGalleryIndex + 1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') openLightbox(currentGalleryIndex - 1);
    if (e.key === 'ArrowRight') openLightbox(currentGalleryIndex + 1);
  });

  // Mobile swipe gestures for lightbox
  let lbTouchStartX = 0;
  let lbTouchEndX = 0;

  lightbox.addEventListener('touchstart', (e) => {
    lbTouchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    lbTouchEndX = e.changedTouches[0].screenX;
    const diff = lbTouchStartX - lbTouchEndX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        // Swiped left -> Next photo
        openLightbox(currentGalleryIndex + 1);
      } else {
        // Swiped right -> Prev photo
        openLightbox(currentGalleryIndex - 1);
      }
    }
  }, { passive: true });
}

/* --- 9. Direct Booking Form Handling & WhatsApp Generator --- */
function initDirectBookingForm() {
  const form = document.getElementById('directBookingForm');
  const waBtn = document.getElementById('submitWhatsAppBtn');

  if (!form) return;

  const nameInput = document.getElementById('formFullName');
  const phoneInput = document.getElementById('formPhone');
  const emailInput = document.getElementById('formEmail');
  const checkinInput = document.getElementById('formCheckin');
  const checkoutInput = document.getElementById('formCheckout');
  const guestsInput = document.getElementById('formGuests');
  const roomInput = document.getElementById('formRoomType');
  const mealInput = document.getElementById('formMealPlan');
  const msgInput = document.getElementById('formMessage');

  function validateForm() {
    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      nameInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    } else {
      nameInput.closest('.form-group').classList.remove('has-error');
    }

    // Validate Phone
    const phoneVal = phoneInput.value.trim();
    if (!phoneVal || phoneVal.length < 8) {
      phoneInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    } else {
      phoneInput.closest('.form-group').classList.remove('has-error');
    }

    return isValid;
  }

  // Handle Form Submit (Direct Inquiry)
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Please complete required fields (Name & Phone Number).', 'error');
      return;
    }

    const payload = {
      name: nameInput.value.trim(),
      phone: phoneInput.value.trim(),
      email: emailInput.value.trim(),
      checkin: checkinInput.value,
      checkout: checkoutInput.value,
      guests: guestsInput.value,
      room: roomInput.value,
      meal: mealInput.value,
      notes: msgInput.value.trim()
    };

    console.log('Direct Booking Inquiry Submitted:', payload);

    showToast(`Thank you, ${payload.name}! Host Ujjwal will contact you on ${payload.phone} shortly with room confirmation.`, 'success');
    form.reset();
    initDatePickers();
  });

  // Handle Instant WhatsApp Booking Button
  if (waBtn) {
    waBtn.addEventListener('click', () => {
      const name = nameInput.value.trim() || 'Guest';
      const phone = phoneInput.value.trim();
      const checkin = checkinInput.value || 'Upcoming';
      const checkout = checkoutInput.value || 'Upcoming';
      const room = roomInput.value;
      const guests = guestsInput.value;
      const meal = mealInput.value;
      const notes = msgInput.value.trim();

      let text = `*New Stay Inquiry – El Cielo Shimla*\n\n`;
      text += `👤 *Guest Name:* ${name}\n`;
      if (phone) text += `📞 *Phone:* ${phone}\n`;
      text += `🛏️ *Room:* ${room}\n`;
      text += `📅 *Dates:* ${checkin} to ${checkout}\n`;
      text += `👥 *Guests:* ${guests}\n`;
      text += `🍽️ *Meal Plan:* ${meal}\n`;
      if (notes) text += `📝 *Notes:* ${notes}\n\n`;
      text += `Please check availability and share best direct rates. Thank you!`;

      const encoded = encodeURIComponent(text);
      const waUrl = `https://wa.me/916230269762?text=${encoded}`;
      window.open(waUrl, '_blank');
      showToast('Opening WhatsApp to chat directly with host Ujjwal...', 'info');
    });
  }
}

/* --- 10. House Rules Modal --- */
function initHouseRulesModal() {
  const modal = document.getElementById('houseRulesModal');
  const openBtn = document.getElementById('openHouseRulesBtn');
  const closeBtn = document.getElementById('closeHouseRulesBtn');
  const agreeBtn = document.getElementById('agreeHouseRulesBtn');

  if (!modal || !openBtn) return;

  function open() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (agreeBtn) agreeBtn.addEventListener('click', close);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });
}

/* --- 11. Back to Top Button --- */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --- 12. Floating WhatsApp Widget & Tooltip --- */
function initFloatingWhatsApp() {
  const tooltip = document.getElementById('waTooltip');
  const closeBtn = document.getElementById('closeWaTooltip');

  if (!tooltip || !closeBtn) return;

  if (sessionStorage.getItem('wa_tooltip_dismissed')) {
    tooltip.style.display = 'none';
  }

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    tooltip.style.display = 'none';
    sessionStorage.setItem('wa_tooltip_dismissed', 'true');
  });
}

/* --- 13. Toast Notification Utility --- */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'success' : ''}`;
  toast.innerHTML = `<span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* --- 14. Dynamic Year in Footer --- */
function initYear() {
  const yearElem = document.getElementById('currentYear');
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }
}

/* --- 15. Mobile Sticky Bottom Bar Controller --- */
function initMobileBottomBar() {
  const bar = document.getElementById('mobileBottomBar');
  const bookBtn = document.getElementById('mobileBarBookBtn');
  if (!bar) return;

  if (bookBtn) {
    bookBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const bookingSec = document.getElementById('booking-section');
      if (bookingSec) {
        bookingSec.scrollIntoView({ behavior: 'smooth' });
        const nameInput = document.getElementById('formFullName');
        if (nameInput) setTimeout(() => nameInput.focus(), 600);
      }
    });
  }

  // Show bottom bar after scrolling past top hero fold
  function handleBarScroll() {
    if (window.innerWidth <= 768) {
      if (window.scrollY > 80) {
        bar.classList.add('visible');
      } else {
        bar.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleBarScroll, { passive: true });
  window.addEventListener('resize', handleBarScroll, { passive: true });
  handleBarScroll();
}
