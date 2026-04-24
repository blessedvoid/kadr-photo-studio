// данные
const items = [
  { id: 1, name: "Портретная", category: "portrait", price: 15000, image: "images/portret.jpg" },
  { id: 2, name: "Семейная", category: "family", price: 25000, image: "images/family.jpg" },
  { id: 3, name: "Love Story", category: "love", price: 20000, image: "images/lovestory.jpg" },
  { id: 4, name: "Детская", category: "kids", price: 10000, image: "images/kids.jpg" },
  { id: 5, name: "Бизнес", category: "business", price: 30000, image: "images/biznes.jpg" },
  { id: 6, name: "Fashion", category: "fashion", price: 15000, image: "images/fashion.jpg" }
];

const grid = document.querySelector('.catalog-grid');
const count = document.querySelector('.catalog-top span');
const searchInput = document.getElementById('search');
const sortSelect = document.querySelector('.catalog-top select');

// чекбоксы
const checkboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');

// цена
const priceFrom = document.querySelector('input[placeholder="От"]');
const priceTo = document.querySelector('input[placeholder="До"]');

// кнопки
const applyBtn = document.querySelector('.filters .btn');
const resetBtn = document.querySelector('.btn-reset');

// рендер
function render(data) {
  grid.innerHTML = "";

  if (data.length === 0) {
    grid.innerHTML = "<p>Ничего не найдено</p>";
    count.textContent = "Найдено: 0";
    return;
  }

  data.forEach(item => {
    grid.innerHTML += `
      <div class="catalog-card">
        <img src="${item.image}" alt="${item.name}">
        <div class="catalog-card__info">
          <h3>${item.name}</h3>
          <p>Фотосессия</p>
          <div class="catalog-card__bottom">
            <span class="price">${item.price}₽</span>
            <a href="#" class="btn">Заказать</a>
          </div>
        </div>
      </div>
    `;
  });

  count.textContent = "Найдено: " + data.length;
}

// фильтр
function filterItems() {
  let filtered = [...items];

  // поиск
  if (searchInput) {
    const value = searchInput.value.toLowerCase();
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(value)
    );
  }

  // категории
  const checked = [...checkboxes]
    .filter(cb => cb.checked)
    .map(cb => cb.nextSibling.textContent.trim().toLowerCase());

  if (checked.length > 0) {
    filtered = filtered.filter(item =>
      checked.some(cat => item.name.toLowerCase().includes(cat))
    );
  }

  // цена
  const min = parseInt(priceFrom.value) || 0;
  const max = parseInt(priceTo.value) || Infinity;

  filtered = filtered.filter(item =>
    item.price >= min && item.price <= max
  );

  // сортировка
  if (sortSelect.value === "По цене") {
    filtered.sort((a, b) => a.price - b.price);
  }

  return filtered;
}

// события
applyBtn.addEventListener('click', () => {
  const result = filterItems();
  render(result);
});

resetBtn.addEventListener('click', () => {
  checkboxes.forEach(cb => cb.checked = false);
  priceFrom.value = "";
  priceTo.value = "";
  if (searchInput) searchInput.value = "";

  render(items);
});

// сортировка
sortSelect.addEventListener('change', () => {
  const result = filterItems();
  render(result);
});

// поиск (в реальном времени)
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const result = filterItems();
    render(result);
  });
}

// старт
render(items);