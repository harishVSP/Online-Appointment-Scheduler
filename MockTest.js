document.addEventListener('DOMContentLoaded', function() {
    const appointmentForm = document.getElementById('appointmentForm');
    const appointmentsList = document.getElementById('appointmentsList');
    const bookingForm = document.getElementById('bookingForm');
    const managementSection = document.getElementById('managementSection');
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const appointment = {
            service,
            date,
            time
        };
        let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments.push(appointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        appointmentForm.reset();
        alert('Appointment booked successfully!');
        displayAppointments();
    });
    function displayAppointments() {
        appointmentsList.innerHTML = '';
        let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments.forEach(function(appointment, index) {
            const appointmentItem = document.createElement('div');
            appointmentItem.classList.add('appointment-item');
            appointmentItem.innerHTML = `
                <strong>Service:</strong> ${appointment.service}<br>
                <strong>Date:</strong> ${appointment.date}<br>
                <strong>Time:</strong> ${appointment.time}<br>
                <button onclick="cancelAppointment(${index})">Cancel</button>
                <hr>
            `;
            appointmentsList.appendChild(appointmentItem);
        });
        if (appointments.length > 0) {
            managementSection.style.display = 'block';
        } else {
            managementSection.style.display = 'none';
        }
    }
    window.cancelAppointment = function(index) {
        let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments.splice(index, 1);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        displayAppointments();
    };
    displayAppointments();
});