const populateMedicalRecordForm = (recordId) => {
  if (recordId) {
    fetch(`http://localhost:3000/api/medicalRecord/${recordId}`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((record) => {
        document.getElementById("patient_id").value = record.patient_id;
        document.getElementById("appointment_date").value = new Date(
          record.appointment_date
        )
          .toISOString()
          .split("T")[0];
        document.getElementById("diagnosis").value = record.diagnosis;

        document.getElementById("medications").value =
          record.medications.join(",") || "";
        document.getElementById("follow_up_date").value = record.follow_up_date
          ? new Date(record.follow_up_date).toISOString().split("T")[0]
          : "";
        document.getElementById("notes").value = record.notes || "";
      })
      .catch((error) =>
        console.error("Error al obtener detalles del registro:", error)
      )
      .finally(() => {
        localStorage.removeItem("recordId");
      });
  }
};

const saveMedicalRecord = (recordId) => {
  // Obtener los valores de los campos del formulario.
  const patient_id = document.getElementById("patient_id").value;
  const appointment_date = document.getElementById("appointment_date").value;
  const diagnosis = document.getElementById("diagnosis").value;
  const medications = document.getElementById("medications").value;
  const follow_up_date = document.getElementById("follow_up_date").value;
  const notes = document.getElementById("notes").value;

  // Crear un objeto con los datos del formulario.
  const formData = {
    patient_id,
    appointment_date,
    diagnosis,
    medications: medications.split(","),
    follow_up_date,
    notes,
  };

  const endpoint = recordId ? `http://localhost:3000/api/medicalRecord/${recordId}` : 'http://localhost:3000/api/medicalRecord';
  const endpoint_method = recordId ? "PUT" : "POST";

  // Realizar una solicitud al servidor para actualizar el registro.
  fetch(endpoint, {
    method: endpoint_method, // Puedes utilizar un método PUT para actualizar el registro.
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (response.ok) {
        alert("Cambios guardados exitosamente.");
        // Puedes redirigir al usuario a la página de visualización de registros individuales o a otra página deseada.
      } else {
        alert("Error al guardar los cambios. Inténtalo de nuevo.");
      }
    })
    .catch((error) => console.error("Error al guardar los cambios:", error))
    .finally(() => {
      localStorage.removeItem("recordId");
      window.location.href = "../index.html";
    });
};

const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "./html/login.html";
  alert("Sesión cerrada.");
};

if (!localStorage.getItem("token")) {
  logout();
}

const recordId = localStorage.getItem("recordId");

populateMedicalRecordForm(recordId);

document.getElementById("logout-link").addEventListener("click", (e) => {
  e.preventDefault();
  logout();
});

document
  .getElementById("medical-record-form")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    saveMedicalRecord(recordId);
  });
