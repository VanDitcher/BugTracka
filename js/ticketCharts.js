import {tixChartVals} from './fBaseTickets.js';
//Ticket Distribution Bar Chart (TICKET MANAGEMENT)
var ctx = document.getElementById('ticketDistribution');
new Chart(ctx, {
    type: 'bar',
    data: {
    labels: ['Low', 'Mid', 'High'],
    datasets: [{
        label: 'Tickets',
        data: [tixChartVals.low, tixChartVals.mid, tixChartVals.high],
        backgroundColor: [
            '#1cc88a',
            '#f6c23e',
            '#e74a3b'
        ],
        borderColor: [
        '#1cc88a',
        '#f6c23e',
        '#e74a3b'
        ],
        borderWidth: 1
    }]
    },
    options: {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins:{
        legend:{display: false}

    },
    scales: {
        y: {
        beginAtZero: true,
        grid: {
            color: "rgba(0, 0, 0, 0)",
        }
        }
    }
    }
});