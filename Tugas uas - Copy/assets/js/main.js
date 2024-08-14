document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelectorAll(".navigation li");

  // Add hovered class to selected list item
  function activeLink() {
    list.forEach((item) => item.classList.remove("hovered"));
    this.classList.add("hovered");
  }

  list.forEach((item) => item.addEventListener("mouseover", activeLink));

  // Menu Toggle
  const toggle = document.querySelector(".toggle");
  const navigation = document.querySelector(".navigation");
  const main = document.querySelector(".main");

  toggle.addEventListener("click", () => {
    navigation.classList.toggle("active");
    main.classList.toggle("active");
  });

  // Admin Management
  const adminTable = document.getElementById('adminTable').getElementsByTagName('tbody')[0];
  const adminForm = document.getElementById('adminForm');
  const adminDataForm = document.getElementById('adminDataForm');
  const adminName = document.getElementById('adminName');
  const adminPosition = document.getElementById('adminPosition');
  const adminTask = document.getElementById('adminTask');
  const adminJoinDate = document.getElementById('adminJoinDate');
  const adminStatus = document.getElementById('adminStatus');
  const adminIndex = document.getElementById('adminIndex');
  const formTitle = document.getElementById('formTitle');

  // Load admin data from localStorage
  let admins = JSON.parse(localStorage.getItem('admins')) || [];

  function renderTable() {
    adminTable.innerHTML = '';
    admins.forEach((admin, index) => {
      const row = adminTable.insertRow();
      row.insertCell(0).textContent = admin.name;
      row.insertCell(1).textContent = admin.position;
      row.insertCell(2).textContent = admin.task;
      row.insertCell(3).textContent = admin.joinDate; // Menampilkan tanggal
      row.insertCell(4).innerHTML = `<span class="status ${admin.status === 'Aktif' ? 'delivered' : 'pending'}">${admin.status}</span>`;
      const actions = row.insertCell(5);
      actions.innerHTML = `
        <button onclick="editAdmin(${index})">Edit</button>
        <button onclick="deleteAdmin(${index})">Hapus</button>
      `;
    });
  }

  window.openForm = (index = null) => {
    adminForm.style.display = 'block';
    if (index !== null) {
      const admin = admins[index];
      formTitle.textContent = 'Edit Admin';
      adminName.value = admin.name;
      adminPosition.value = admin.position;
      adminTask.value = admin.task;
      adminJoinDate.value = admin.joinDate; // Set tanggal
      adminStatus.value = admin.status;
      adminIndex.value = index;
    } else {
      formTitle.textContent = 'Tambah Admin';
      adminName.value = '';
      adminPosition.value = '';
      adminTask.value = '';
      adminJoinDate.value = ''; // Reset tanggal
      adminStatus.value = 'Aktif';
      adminIndex.value = '';
    }
  }

  window.closeForm = () => {
    adminForm.style.display = 'none';
  }

  const saveAdmin = (event) => {
    event.preventDefault();
    const index = adminIndex.value;
    const admin = {
      name: adminName.value,
      position: adminPosition.value,
      task: adminTask.value,
      joinDate: adminJoinDate.value, // Mendapatkan tanggal
      status: adminStatus.value
    };

    if (index !== '') {
      admins[index] = admin; // Update existing admin
    } else {
      admins.push(admin); // Add new admin
    }

    localStorage.setItem('admins', JSON.stringify(admins)); // Save to localStorage
    renderTable(); // Update the table
    closeForm(); // Hide the form
  }

  window.deleteAdmin = (index) => {
    admins.splice(index, 1); // Remove admin
    localStorage.setItem('admins', JSON.stringify(admins)); // Save updated data
    renderTable(); // Update the table
  }

  window.editAdmin = (index) => {
    openForm(index); // Open form for editing
  }

  adminDataForm.addEventListener('submit', saveAdmin);
  renderTable(); // Initial render of the table
});
