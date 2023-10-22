const URL = "http://localhost:3000/api/user";

const login = e => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(`${URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "../index.html";
        alert("Usuario autenticado exitosamente.");
      } else {
        alert("Error en la solicitud de autenticación.");
      }
    })
    .finally(() => {
      localStorage.removeItem("recordId");
    });
};

const token = localStorage.getItem("token");
if (token) {
    window.location.href = "../index.html";
}

document.getElementById("login-form").addEventListener("submit", login);
