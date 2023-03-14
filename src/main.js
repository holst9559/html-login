const form = document.querySelector("form");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = getFormData(form);

  if (form.id === "login") {
    validateInputs();
  } else if (form.id === "register") {
    validateRegisterInputs();
  }
});

function getFormData(form) {
  const formObj = new FormData(form);
  return formObj;
}

function checkEmail(email) {
  const pattern = /^\S+@\S+\.\S+$/;
  return pattern.test(email);
}

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const validateInputs = () => {
  const emailValue = email.value;
  const passwordValue = password.value;

  let validateEmail = false;
  let validatePassword = false;

  if (emailValue === "") {
    setError(email, "Email is required");
  } else if (!checkEmail(emailValue)) {
    setError(email, "Provide a valid email adress");
  } else {
    setSuccess(email);
    validateEmail = true;
  }

  if (passwordValue === "") {
    setError(password, "Password is required");
  } else if (passwordValue.length < 8) {
    setError(password, "Password must be atleast 8 characters");
  } else {
    setSuccess(password);
    validatePassword = true;
  }
  if (validateEmail === true && validatePassword === true) {
    const container = document.getElementById("form-container");

    container.innerHTML = `<div id="form-container" class="w-full py-10 px-12">
    <h2 class="text-5xl mb-10 text-center">Welcome</h2>
      <div class="input-control mt-5">
      <div class="text-center pt-4">
        <p>
          Return to homepage? Click
          <a href="index.html" class="font-semibold underline"
            >here</a
          >
        </p>
      </div>
  </div>`;
  }
};

validateRegisterInputs = () => {
  const emailValue = email.value;
  const passwordValue = password.value;
  const passwordValue2 = password2.value;
  const firstNameValue = firstName.value;
  const lastNameValue = lastName.value;

  let validateArray = [
    (validateFirstName = false),
    (validateLastName = false),
    (validateEmail = false),
    (validatePassword = false),
    (validatePassword2 = false),
  ];

  if (firstNameValue === "") {
    setError(firstName, "First name is required");
  } else {
    setSuccess(firstName);
    validateArray[0] = true;
  }
  if (lastNameValue === "") {
    setError(lastName, "Last name is required");
  } else {
    setSuccess(lastName);
    validateArray[1] = true;
  }

  if (emailValue === "") {
    setError(email, "Email is required");
  } else if (!checkEmail(emailValue)) {
    setError(email, "Provide a valid email adress");
  } else {
    setSuccess(email);
    validateArray[2] = true;
  }

  if (passwordValue === "") {
    setError(password, "Password is required");
  } else if (passwordValue.length < 8) {
    setError(password, "Password must be atleast 8 characters");
  } else {
    setSuccess(password);
    validateArray[3] = true;
  }

  if (passwordValue2 !== passwordValue) {
    setError(password2, "Password must match");
  } else {
    setSuccess(password2);
    validateArray[4] = true;
  }

  if (!validateArray.includes(false)) {
    const container = document.getElementById("form-container");

    container.innerHTML = `<div id="form-container" class="w-full py-10 px-12">
    <h2 class="text-5xl mb-10 text-center">Registration successfull</h2>
      <div class="input-control mt-5">
      <div class="text-center pt-4">
        <p>
          Return to homepage? Click
          <a href="index.html" class="font-semibold underline"
            >here</a
          >
        </p>
      </div>
  </div>`;
  }
};

checkPasswordStr = (password) => {
  const indicator = document.getElementById("passwordStr");

  let strong = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );
  let medium = new RegExp(
    "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
  );

  if (strong.test(password)) {
    indicator.style.backgroundColor = "green";
    indicator.innerText = "Strong";
  } else if (medium.test(password)) {
    indicator.style.backgroundColor = "yellow";
    indicator.innerText = "Medium";
  } else {
    indicator.style.backgroundColor = "red";
    indicator.innerText = "Weak";
  }
};

let timeout;

if (window.location.pathname === "/dist/register.html") {
  password.addEventListener("input", () => {
    clearTimeout(timeout);
    timeout = setTimeout(checkPasswordStr(password.value), 500);
  });
}
