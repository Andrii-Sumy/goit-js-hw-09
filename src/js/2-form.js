const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  formData = JSON.parse(savedData);
  form.elements.email.value = formData.email || '';
  form.elements.message.value = formData.message || '';
}

form.addEventListener('input', event => {
  const { name, value } = event.target;

  if (!formData.hasOwnProperty(name)) return;

  let cleanValue = value;

  if (name === 'email') {
    cleanValue = cleanValue.replace(/[а-яА-ЯёЁїЇіІєЄ]/g, '');
    cleanValue = cleanValue.trim();
    event.target.value = cleanValue;
  }

  if (name === 'message') {
    cleanValue = cleanValue.trimStart();
  }

  formData[name] = cleanValue;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const email = formData.email.trim();
  const message = formData.message.trim();

  if (!email || !message) {
    alert('Please fill in all fields.');
    return;
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address (like name@example.com).');
    return;
  }

  console.log('Form submitted:', { email, message });

  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
});
