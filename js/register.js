const URL = "http://localhost:3000/api/user";

const register = async e => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const passwordConfirmation =
    document.getElementById("confirm_password").value;

  if (password !== passwordConfirmation) {
    alert("Las contraseñas no coinciden.");
  }

  try {
    const response = await fetch(`${URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).finally(() => {
      localStorage.removeItem("recordId");
    });
    if (response.ok) {
      alert("Usuario creado exitosamente.");
      window.location.href = "./login.html";
    } else {
      alert("Error en la solicitud de registro.");
    }
  } catch (error) {
    alert("Error en la solicitud de registro.");
  }
};

const token = localStorage.getItem("token");
if (token) {
  window.location.href = "../index.html";
}

document
  .getElementById("register-form")
  .addEventListener("submit", register);
