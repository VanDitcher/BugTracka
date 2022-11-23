//Ticket Distribution Bar Chart (TICKET MANAGEMENT)
var ctx = document.getElementById('ticketDistributionBarChart').getContext('2d');
var ticketDistributionBarChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: ['Low', 'Mid', 'High'],
        datasets: [{
            label: 'Tickets',
            data: [1, 1, 1],
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
        legend: {
          display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
                }
            }],
        }
    }
});