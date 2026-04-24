console.log('Сайт фотостудии «Кадр» запущен');


// =====================
// ФОРМА (booking)
// =====================
const steps = document.querySelectorAll('.form-step');
const nextBtns = document.querySelectorAll('.next');
const prevBtns = document.querySelectorAll('.prev');
const form = document.getElementById('bookingForm');

let currentStep = 0;

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle('active', i === index);
  });
}

if (form) {

  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const inputs = steps[currentStep].querySelectorAll('input, select');
      let valid = true;

      inputs.forEach(input => {
        if (!input.value) valid = false;
      });

      const error = document.querySelector('.error');
      if (!valid) {
        if (error) error.style.display = 'block';
        return;
      }

      if (error) error.style.display = 'none';

      currentStep++;
      showStep(currentStep);
    });
  });

  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentStep--;
      showStep(currentStep);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const success = document.querySelector('.success');
    if (success) success.style.display = 'block';

    form.reset();
    currentStep = 0;
    showStep(currentStep);
  });
}


// =====================
// БУРГЕР МЕНЮ
// =====================
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const overlay = document.querySelector('.overlay');

if (burger && nav && overlay) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  overlay.addEventListener('click', () => {
    nav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
  });

  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });
}


// =====================
// КАТАЛОГ (рендер)
// =====================
const items = [
  {id:1, name:"Портретная", category:"portrait", price:15000, image:"images/portret.jpg"},
  {id:2, name:"Семейная", category:"family", price:25000, image:"images/family.jpg"},
  {id:3, name:"Love Story", category:"love", price:20000, image:"images/lovestory.jpg"},
  {id:4, name:"Детская", category:"kids", price:10000, image:"images/kids.jpg"},
];

const grid = document.querySelector('.catalog-grid');
const count = document.querySelector('.catalog-top span');

function render(data) {
  if (!grid) return;

  grid.innerHTML = "";

  if (data.length === 0) {
    grid.innerHTML = "<p>Ничего не найдено</p>";
    if (count) count.textContent = "Найдено: 0";
    return;
  }

  data.forEach(item => {
    grid.innerHTML += `
      <div class="catalog-card">
        <img src="${item.image}">
        <h3>${item.name}</h3>
        <span>${item.price}₽</span>
      </div>
    `;
  });

  if (count) count.textContent = "Найдено: " + data.length;
}

render(items);


// =====================
// АНИМАЦИЯ ПРИ СКРОЛЛЕ
// =====================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

document.querySelectorAll('section').forEach(section => {
  section.classList.add('fade-in');
  observer.observe(section);
});


// =====================
// КНОПКА НАВЕРХ
// =====================
const topBtn = document.getElementById('topBtn');

if (topBtn) {
  window.addEventListener('scroll', () => {
    topBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });

  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}