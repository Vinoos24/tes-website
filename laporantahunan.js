// laporantahunan.js

document.addEventListener('DOMContentLoaded', function() {
    const reportForm = document.getElementById('reportForm');
    const annualChart = document.getElementById('annualChart').getContext('2d');
    const historyTableBody = document.querySelector('#historyTable tbody');
    const historyContainer = document.getElementById('historyContainer');
    const showHistoryBtn = document.getElementById('showHistoryBtn');

    // Load report data from localStorage or initialize as empty array
    let reportData = JSON.parse(localStorage.getItem('reportData')) || [];

    // Initialize Chart
    const chart = new Chart(annualChart, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Laporan Tahunan',
                data: [],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Update the chart and history table with data
    updateChart();
    updateHistoryTable();

    reportForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const year = document.getElementById('year').value;
        const value = document.getElementById('value').value;
        const assetIncrease = document.getElementById('assetIncrease').value;
        const numBorrower = document.getElementById('numBorrower').value;
        const fundIncrease = document.getElementById('fundIncrease').value;

        // Check if year already exists
        const index = reportData.findIndex(d => d.year === year);

        if (index === -1) {
            // Add new data
            const data = {
                year,
                value,
                assetIncrease,
                numBorrower,
                fundIncrease
            };
            reportData.push(data);
        } else {
            // Update existing data
            reportData[index] = {
                year,
                value,
                assetIncrease,
                numBorrower,
                fundIncrease
            };
        }

        localStorage.setItem('reportData', JSON.stringify(reportData)); // Save data to localStorage
        updateChart();
        updateHistoryTable();
        reportForm.reset();
    });

    showHistoryBtn.addEventListener('click', function() {
        historyContainer.style.display = historyContainer.style.display === 'none' ? 'block' : 'none';
    });

    function updateChart() {
        const years = reportData.map(d => d.year);
        const values = reportData.map(d => d.value);

        chart.data.labels = years;
        chart.data.datasets[0].data = values;
        chart.update();
    }

    function updateHistoryTable() {
        historyTableBody.innerHTML = '';
        reportData.forEach((data, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data.year}</td>
                <td>${data.value}</td>
                <td>${data.assetIncrease}</td>
                <td>${data.numBorrower}</td>
                <td>${data.fundIncrease}</td>
                <td>
                    <button onclick="editData(${index})">Edit</button>
                    <button onclick="deleteData(${index})">Delete</button>
                </td>
            `;
            historyTableBody.appendChild(row);
        });
    }

    window.editData = function(index) {
        const data = reportData[index];
        document.getElementById('year').value = data.year;
        document.getElementById('value').value = data.value;
        document.getElementById('assetIncrease').value = data.assetIncrease;
        document.getElementById('numBorrower').value = data.numBorrower;
        document.getElementById('fundIncrease').value = data.fundIncrease;
        reportForm.dataset.index = index; // Save the index for later use
    };

    window.deleteData = function(index) {
        reportData.splice(index, 1);
        localStorage.setItem('reportData', JSON.stringify(reportData)); // Save data to localStorage
        updateChart();
        updateHistoryTable();
    };
});

// Toggle Menu
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
    navigation.classList.toggle("active");
    main.classList.toggle("active");
};
