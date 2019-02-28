const email = document.querySelector('#email');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const phone = document.querySelector('#phone');
const password = document.querySelector('#password');
const registerForm = document.querySelector('#registerForm');
const loginForm = document.querySelector('#loginForm');
const signUp = 'https://ibk-politico.herokuapp.com/api/v1/auth/signup';
const login = 'https://ibk-politico.herokuapp.com/api/v1/auth/login';

function handleErrors(res) {
  if (!res.ok) {
    return res.json()
      .then(data => data.error)
      .then((err) => {
        displayError(err);
        throw new Error(err)
      })
  }
  return res.json();
}

function displayError(err) {
  // Add div to body
  const newNode = document.createElement('div');
  newNode.id = 'snackbar';
  newNode.innerHTML = err
  document.body.appendChild(newNode);
  // Get the snackbar DIV
  const x = document.getElementById('snackbar');
  const y = document.querySelectorAll('#snackbar');
  // Add the "show" class to DIV
  x.className = 'show';
  setTimeout(() => { x.className = x.className.replace('show', ''); }, 5000);
  setTimeout(() => { 
    for (let i = 0; i < y.length; i++) {
      x.parentNode.removeChild(y[i]);
    } 
  }, 5001);
}

function fetchAuth(url,values) {
  fetch(url, {
    mode: 'cors',
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(values),
  })
    .then(handleErrors)
    .then((resObj) => {
      window.localStorage.setItem('token', resObj.data[0].token);
      window.location.href = './home.html';
    })
    .catch(err => console.log(err));
}

function registerUser(e) {
  e.preventDefault();
  const values = {
    email: email.value,
    firstname: firstName.value,
    lastname: lastName.value,
    phone: phone.value,
    password: password.value,
  };
  fetchAuth(signUp, values);
}

function loginUser(e) {
  e.preventDefault();
  const values = {
    email: email.value,
    password: password.value,
  };
  fetchAuth(login, values);
}

if(registerForm) {
  registerForm.addEventListener('submit', registerUser);
}
if(loginForm) {
  loginForm.addEventListener('submit', loginUser);
}

