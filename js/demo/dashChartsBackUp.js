// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Priority Projects Pie Chart
var ctx = document.getElementById("priorityProjectsBarChart1");
var priorityProjectsBarChart1 = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["High", "Mid", "Low"],
    datasets: [{
      data: [1, 1, 1],
      backgroundColor: ['#e74a3b', '#f6c23e', '#1cc88a'],
      hoverBackgroundColor: ['#D52A1A', '#F4B30D', '#34E3A4'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
    },
    legend: {
      display: true
    }
  },
});


//User Composition Bar Chart
var ctx = document.getElementById('userCompositionBarChart').getContext('2d');
var userCompositionBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'],
        datasets: [{
            label: 'Submitters',
            data: [2, 3, 3, 4, 2, 2],
            backgroundColor: [
                '#CB6A11',
                '#CB6A11',
                '#CB6A11',
                '#CB6A11',
                '#CB6A11',
                '#CB6A11'
            ],
            borderColor: [
              '#CB6A11',
              '#CB6A11',
              '#CB6A11',
              '#CB6A11',
              '#CB6A11',
              '#CB6A11'
            ],
            borderWidth: 1
        }, {
          label: 'Developers',
          data: [1, 2, 2, 3, 2, 2],
          backgroundColor: [
              '#6A11CB',
              '#6A11CB',
              '#6A11CB',
              '#6A11CB',
              '#6A11CB',
              '#6A11CB'
          ],
          borderColor: [
              '#6A11CB',
              '#6A11CB',
              '#6A11CB',
              '#6A11CB',
              '#6A11CB',
              '#6A11CB'
          ],
          borderWidth: 1
      }, {
        label: 'PMs',
        data: [1, 1, 1, 2, 2, 1],
        backgroundColor: [
            '#11CB6A',
            '#11CB6A',
            '#11CB6A',
            '#11CB6A',
            '#11CB6A',
            '#11CB6A'
        ],
        borderColor: [
            '#11CB6A',
            '#11CB6A',
            '#11CB6A',
            '#11CB6A',
            '#11CB6A',
            '#11CB6A'
        ],
        borderWidth: 1
    }, ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                stacked: true,
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
              stacked: true,
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
              },
              barPercentage: 0.4
          }]
        }
    }
});

//Ticket Distribution Bar Chart (DASHBOARD)
var ctx = document.getElementById('ticketDistributionBarChart1').getContext('2d');
var ticketDistributionBarChart1 = new Chart(ctx, {
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

//Ticket Distribution Bar Chart (TICKET MANAGEMENT)
var ctx = document.getElementById('ticketDistributionBarChart2').getContext('2d');
var ticketDistributionBarChart2 = new Chart(ctx, {
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