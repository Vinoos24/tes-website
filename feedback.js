// Fungsi untuk menyimpan data ke localStorage
function saveFeedback(effectiveness, performance, comments) {
    let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    feedbacks.push({ effectiveness, performance, comments });
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
}

// Fungsi untuk menampilkan feedback yang sudah disimpan
function displayFeedbacks() {
    const feedbackContainer = document.querySelector('.feedback-list');
    let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];

    feedbackContainer.innerHTML = '<h3>Feedback yang Telah Dikirim:</h3>';

    feedbacks.forEach(feedback => {
        const feedbackElement = document.createElement('div');
        feedbackElement.classList.add('feedback-item');
        feedbackElement.innerHTML = `
            <h4>Effectiveness: ${feedback.effectiveness}</h4>
            <h4>Performance: ${feedback.performance}</h4>
            <p>Comments: ${feedback.comments}</p>
        `;
        feedbackContainer.appendChild(feedbackElement);
    });
}

// Menangani pengiriman form
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Mencegah pengiriman form default

        const effectiveness = document.getElementById('effectiveness').value;
        const performance = document.getElementById('performance').value;
        const comments = document.getElementById('comments').value;

        saveFeedback(effectiveness, performance, comments);

        alert('Feedback terkirim! Terima kasih atas masukan Anda.');

        form.reset();

        displayFeedbacks();
    });

    displayFeedbacks();
});


// server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Dummy data
let feedbacks = [
  { id: 1, title: 'Feedback 1', content: 'This is feedback 1' },
  { id: 2, title: 'Feedback 2', content: 'This is feedback 2' }
];

// Route untuk menghapus feedback
app.delete('/feedback/:id', (req, res) => {
  const feedbackId = parseInt(req.params.id);
  feedbacks = feedbacks.filter(feedback => feedback.id !== feedbackId);
  res.status(200).json({ message: 'Feedback deleted' });
});

// Route untuk mendapatkan semua feedback
app.get('/feedback', (req, res) => {
  res.json(feedbacks);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
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