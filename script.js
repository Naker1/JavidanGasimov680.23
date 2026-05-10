// Мобильная навигация, поиск, фильтры и проверка формы.
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navbar = document.querySelector('.navbar');

  if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navbar.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const searchInput = document.querySelector('#programSearch');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const softwareCards = document.querySelectorAll('#softwareList .software-card');
  const emptyState = document.querySelector('#emptyState');
  let activeCategory = 'all';

  function updateCatalog() {
    if (!softwareCards.length) return;

    const searchValue = searchInput ? searchInput.value.trim().toLowerCase() : '';
    let visibleCount = 0;

    softwareCards.forEach((card) => {
      const cardName = card.dataset.name.toLowerCase();
      const cardCategory = card.dataset.category;
      const matchesSearch = cardName.includes(searchValue);
      const matchesCategory = activeCategory === 'all' || cardCategory === activeCategory;
      const isVisible = matchesSearch && matchesCategory;

      card.style.display = isVisible ? 'flex' : 'none';
      if (isVisible) visibleCount += 1;
    });

    if (emptyState) {
      emptyState.style.display = visibleCount ? 'none' : 'block';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', updateCatalog);
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      activeCategory = button.dataset.filter;
      updateCatalog();
    });
  });

  document.querySelectorAll('.animated-btn').forEach((button) => {
    button.addEventListener('click', () => {
      button.classList.add('clicked');
      setTimeout(() => button.classList.remove('clicked'), 180);
    });
  });

  const contactForm = document.querySelector('#contactForm');
  const formMessage = document.querySelector('#formMessage');

  if (contactForm && formMessage) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const name = String(formData.get('name') || '').trim();
      const email = String(formData.get('email') || '').trim();
      const message = String(formData.get('message') || '').trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      formMessage.classList.remove('success');

      if (name.length < 2) {
        formMessage.textContent = 'Введите имя длиной не менее 2 символов.';
        return;
      }

      if (!emailPattern.test(email)) {
        formMessage.textContent = 'Введите корректный email.';
        return;
      }

      if (message.length < 10) {
        formMessage.textContent = 'Сообщение должно содержать не менее 10 символов.';
        return;
      }

      formMessage.textContent = 'Сообщение успешно подготовлено к отправке.';
      formMessage.classList.add('success');
      contactForm.reset();
    });
  }

  document.querySelectorAll('.newsletter-form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const input = form.querySelector('input[type="email"]');
      if (!input || !input.value.trim()) return;

      input.value = '';
      input.placeholder = 'Спасибо за подписку';
    });
  });
});
