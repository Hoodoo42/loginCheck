// this function will take the users input and send it as a request.

function loginAttempt(details) {
  let emailInput = document.getElementById(`email_input`);
  let emailValue = emailInput[`value`];

  let passwordInput = document.getElementById(`password_input`);
  let passwordValue = passwordInput[`value`];

  axios
    .request({
      url: `https://reqres.in/api/login`,

      method: `POST`,
      data: {
        email: emailValue,
        password: passwordValue,
      },
    })
    .then(loginSuccess)
    .catch(loginFailure);
}
// this success function will take the response (a login token) and store it in a cookie
// if login is a success the user will see a log out button on the logout.html
function loginSuccess(resp) {
  let token = resp[`data`][`token`];
  Cookies.set(`loginToken`, token);

  document.body.insertAdjacentHTML(
    `beforebegin`,
    `
    <h3>Login Success</h3>`
  );
  location.href = `logout.html`;
}
// if request fails for any reason, the user will recieve an error message
function loginFailure(err) {
  document.body.insertAdjacentHTML(
    `beforebegin`,
    `
        <h3>Login Error</h3>`
  );
}

// grabbing the button by its id and setting an eventListener to it that will spark the function loginAttempt
let loginButton = document.getElementById(`login_button`);
loginButton.addEventListener(`click`, loginAttempt);
