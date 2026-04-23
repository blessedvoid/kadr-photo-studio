console.log('Сайт фотостудии «Кадр» запущен');
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

nextBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const inputs = steps[currentStep].querySelectorAll('input, select');
    let valid = true;

    inputs.forEach(input => {
      if (!input.value) valid = false;
    });

    if (!valid) {
      document.querySelector('.error').style.display = 'block';
      return;
    }

    document.querySelector('.error').style.display = 'none';
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

  document.querySelector('.success').style.display = 'block';
  form.reset();
  currentStep = 0;
  showStep(currentStep);
});