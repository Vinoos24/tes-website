
document.addEventListener('DOMContentLoaded', () => {
    const reportForm = document.getElementById('reportForm');
    const reportTable = document.getElementById('reportTable').getElementsByTagName('tbody')[0];

    // Load data from localStorage and display
    function loadReports() {
        const reports = JSON.parse(localStorage.getItem('reports')) || [];
        reportTable.innerHTML = '';
        reports.forEach((report, index) => {
            const row = reportTable.insertRow();
            row.innerHTML = `
                <td>${report.userName}</td>
                <td>${report.itemName}</td>
                <td>${report.quantityUsed}</td>
                <td>${report.borrowDate}</td>
                <td>${report.returnDate}</td>
                <td>${report.conditionAtBorrow}</td>
                <td>${report.conditionAtReturn}</td>
                <td>${report.compensationExplanation}</td>
                <td>${report.compensationAmount}</td>
                <td><button class="delete-btn" data-index="${index}">Hapus</button></td>
            `;
        });
    }

    // Save data to localStorage
    function saveReports(reports) {
        localStorage.setItem('reports', JSON.stringify(reports));
    }

    // Add new report
    reportForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const userName = document.getElementById('userName').value;
        const itemName = document.getElementById('itemName').value;
        const quantityUsed = document.getElementById('quantityUsed').value;
        const borrowDate = document.getElementById('borrowDate').value;
        const returnDate = document.getElementById('returnDate').value;
        const conditionAtBorrow = document.getElementById('conditionAtBorrow').value;
        const conditionAtReturn = document.getElementById('conditionAtReturn').value;
        const compensationExplanation = document.getElementById('compensationExplanation').value;
        const compensationAmount = document.getElementById('compensationAmount').value;

        const newReport = { userName, itemName, quantityUsed, borrowDate, returnDate, conditionAtBorrow, conditionAtReturn, compensationExplanation, compensationAmount };
        const reports = JSON.parse(localStorage.getItem('reports')) || [];
        reports.push(newReport);
        saveReports(reports);
        loadReports();

        // Clear form
        reportForm.reset();
    });

    // Delete report
    reportTable.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const index = event.target.getAttribute('data-index');
            const reports = JSON.parse(localStorage.getItem('reports')) || [];
            reports.splice(index, 1);
            saveReports(reports);
            loadReports();
        }
    });

    loadReports();
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
