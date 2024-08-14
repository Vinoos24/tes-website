document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector(".toggle");
    const navigation = document.querySelector(".navigation");
    const recordForm = document.getElementById("recordForm");
    const historyTable = document.getElementById("historyTable").getElementsByTagName('tbody')[0];

    toggleButton.addEventListener("click", function () {
        navigation.classList.toggle("active");
        document.querySelector(".main").style.width = navigation.classList.contains("active") ? "calc(100% - 80px)" : "calc(100% - 300px)";
        document.querySelector(".main").style.left = navigation.classList.contains("active") ? "80px" : "300px";
    });

    window.addRecord = function () {
        const formData = new FormData(recordForm);

        const row = historyTable.insertRow();
        row.insertCell(0).textContent = formData.get("itemCode");
        row.insertCell(1).textContent = formData.get("itemName");
        row.insertCell(2).textContent = formData.get("itemSpecs");
        row.insertCell(3).textContent = formData.get("itemQuantity");
        row.insertCell(4).textContent = formData.get("lastSeenDate");
        row.insertCell(5).textContent = formData.get("itemCondition");
        row.insertCell(6).textContent = formData.get("reporterName");
        row.insertCell(7).textContent = formData.get("lastUserName");
        row.insertCell(8).textContent = formData.get("actionTaken");
        row.insertCell(9).textContent = formData.get("estimatedCost");
        row.insertCell(10).textContent = formData.get("reportNumber");
        row.insertCell(11).innerHTML = formData.get("itemImage") ? `<img src="${URL.createObjectURL(formData.get("itemImage"))}" alt="Item Image">` : '';
        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Hapus";
        deleteButton.onclick = function () {
            historyTable.deleteRow(row.rowIndex - 1);
        };
        row.insertCell(12).appendChild(deleteButton);

        recordForm.reset();
    };
});





// batas
// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};