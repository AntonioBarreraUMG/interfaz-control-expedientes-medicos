const URL = "http://localhost:3000/api/medicalRecord";

const deleteRecord = (recordId) => {
    if (confirm("¿Estás seguro de que quieres eliminar este registro?")) {
      fetch(`${URL}/${recordId}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.mensaje) {
            window.location.reload();
          } else {
            alert("Error al eliminar el registro.");
          }
        })
        .catch((error) => {
          console.error("Error al eliminar el registro:", error);
          alert("Error al eliminar el registro.");
        });
    }
};
  
const modifyRecord = (recordId) => {
    localStorage.setItem("recordId", recordId);
    window.location.href = "./html/medical-record-form.html";
};

const populateRecordsList = (records) => {
    const medicalRecordTable = document.getElementById("medical-record-table");
    records.forEach((record) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${record.patient_id }</td>
            <td>${record.appointment_date.split('T')[0]}</td>
            <td>${record.diagnosis}</td>
            <td>${record.medications ? record.medications.join(',') : ''}</td>
            <td>${record.follow_up_date ? record.follow_up_date.split('T')[0] : ''}</td>
            <td>${record.notes || ''}</td>
            <td>
                <button onclick="deleteRecord('${record._id}')">Eliminar</button>
                <button onclick="modifyRecord('${record._id}')">Modificar</button>
            </td>
        `;
        medicalRecordTable.appendChild(row);
    });
};

const fetchAndPopulateRecordsList = async () => {
    fetch(URL, {
        method: "GET",
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    })
    .then((response) => response.json())
    .then(populateRecordsList)
    .catch((error) =>
        console.error("Error al obtener la lista de registros:", error)
    )
    .finally(() => {
        localStorage.removeItem("recordId");
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

fetchAndPopulateRecordsList();

document.getElementById("logout-link").addEventListener("click", e => {
    e.preventDefault();
    logout();
});
