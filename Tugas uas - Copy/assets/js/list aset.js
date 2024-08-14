document.addEventListener('DOMContentLoaded', function () {
    const itemForm = document.getElementById('itemForm');
    const itemTable = document.getElementById('itemTable').getElementsByTagName('tbody')[0];
    let editingRow = null;

    loadItems();

    itemForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const itemCode = document.getElementById('itemCode').value;
        const itemName = document.getElementById('itemName').value;
        const itemLocation = document.getElementById('itemLocation').value;
        const itemQuantity = document.getElementById('itemQuantity').value;
        const itemDate = document.getElementById('itemDate').value;
        const itemCondition = document.getElementById('itemCondition').value;
        const itemSpec = document.getElementById('itemSpec').value;
        const itemMaintenance = document.getElementById('itemMaintenance').value;
        const itemAge = document.getElementById('itemAge').value;
        const itemPhoto = document.getElementById('itemPhoto').files[0];

        if (itemPhoto) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const photoURL = e.target.result;
                if (editingRow) {
                    updateItemInTable(editingRow, itemCode, itemName, itemLocation, itemQuantity, itemDate, itemCondition, itemSpec, itemMaintenance, itemAge, photoURL);
                    updateItemInLocalStorage(editingRow, itemCode, itemName, itemLocation, itemQuantity, itemDate, itemCondition, itemSpec, itemMaintenance, itemAge, photoURL);
                    editingRow = null;
                } else {
                    addItemToTable(itemCode, itemName, itemLocation, itemQuantity, itemDate, itemCondition, itemSpec, itemMaintenance, itemAge, photoURL);
                    saveItemToLocalStorage(itemCode, itemName, itemLocation, itemQuantity, itemDate, itemCondition, itemSpec, itemMaintenance, itemAge, photoURL);
                }
                itemForm.reset();
            };
            reader.readAsDataURL(itemPhoto);
        }
    });

    function addItemToTable(code, name, location, quantity, date, condition, spec, maintenance, age, photoURL) {
        const row = itemTable.insertRow();
        row.insertCell(0).textContent = code;
        row.insertCell(1).textContent = name;
        row.insertCell(2).textContent = location;
        row.insertCell(3).textContent = quantity;
        row.insertCell(4).textContent = date;
        row.insertCell(5).textContent = condition;
        row.insertCell(6).textContent = spec;
        row.insertCell(7).textContent = maintenance;
        row.insertCell(8).textContent = age;
        row.insertCell(9).innerHTML = `<img src="${photoURL}" alt="Item Photo">`;
        row.insertCell(10).innerHTML = `
            <button onclick="editItem(this)">Edit</button>
            <button onclick="deleteItem(this)">Hapus</button>
        `;
    }

    function updateItemInTable(row, code, name, location, quantity, date, condition, spec, maintenance, age, photoURL) {
        row.cells[0].textContent = code;
        row.cells[1].textContent = name;
        row.cells[2].textContent = location;
        row.cells[3].textContent = quantity;
        row.cells[4].textContent = date;
        row.cells[5].textContent = condition;
        row.cells[6].textContent = spec;
        row.cells[7].textContent = maintenance;
        row.cells[8].textContent = age;
        row.cells[9].innerHTML = `<img src="${photoURL}" alt="Item Photo">`;
    }

    function saveItemToLocalStorage(code, name, location, quantity, date, condition, spec, maintenance, age, photoURL) {
        let items = JSON.parse(localStorage.getItem('items')) || [];
        items.push({ code, name, location, quantity, date, condition, spec, maintenance, age, photoURL });
        localStorage.setItem('items', JSON.stringify(items));
    }

    function updateItemInLocalStorage(row, code, name, location, quantity, date, condition, spec, maintenance, age, photoURL) {
        let items = JSON.parse(localStorage.getItem('items')) || [];
        let index = Array.from(itemTable.rows).indexOf(row) - 1;
        if (index > -1) {
            items[index] = { code, name, location, quantity, date, condition, spec, maintenance, age, photoURL };
            localStorage.setItem('items', JSON.stringify(items));
        }
    }

    function loadItems() {
        let items = JSON.parse(localStorage.getItem('items')) || [];
        items.forEach(item => {
            addItemToTable(item.code, item.name, item.location, item.quantity, item.date, item.condition, item.spec, item.maintenance, item.age, item.photoURL);
        });
    }

    window.editItem = function (btn) {
        const row = btn.parentElement.parentElement;
        editingRow = row;
        document.getElementById('itemCode').value = row.cells[0].textContent;
        document.getElementById('itemName').value = row.cells[1].textContent;
        document.getElementById('itemLocation').value = row.cells[2].textContent;
        document.getElementById('itemQuantity').value = row.cells[3].textContent;
        document.getElementById('itemDate').value = row.cells[4].textContent;
        document.getElementById('itemCondition').value = row.cells[5].textContent;
        document.getElementById('itemSpec').value = row.cells[6].textContent;
        document.getElementById('itemMaintenance').value = row.cells[7].textContent;
        document.getElementById('itemAge').value = row.cells[8].textContent;
        document.getElementById('itemPhoto').value = ''; 
    };

    window.deleteItem = function (btn) {
        const row = btn.parentElement.parentElement;
        row.remove();
        let items = JSON.parse(localStorage.getItem('items')) || [];
        let index = Array.from(itemTable.rows).indexOf(row) - 1;
        if (index > -1) {
            items.splice(index, 1);
            localStorage.setItem('items', JSON.stringify(items));
        }
    };
});



// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};
