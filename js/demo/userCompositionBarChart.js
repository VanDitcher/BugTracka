// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example

var ctx = document.getElementById('userCompositionBarChart').getContext('2d');
var userCompositionBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'],
        datasets: [{
            label: 'Submitters',
            data: [2, 3, 3, 4, 2, 5],
            backgroundColor: [
                'rgba(255, 193, 7, 0.4)',
                'rgba(255, 193, 7, 0.4)',
                'rgba(255, 193, 7, 0.4)',
                'rgba(255, 193, 7, 0.4)',
                'rgba(255, 193, 7, 0.4)',
                'rgba(255, 193, 7, 0.4)'
            ],
            borderColor: [
              'rgba(255, 193, 7, 0.4)',
              'rgba(255, 193, 7, 0.4)',
              'rgba(255, 193, 7, 0.4)',
              'rgba(255, 193, 7, 0.4)',
              'rgba(255, 193, 7, 0.4)',
              'rgba(255, 193, 7, 0.4)'
            ],
            borderWidth: 1
        }, {
          label: 'Developers',
          data: [1, 2, 2, 3, 2, 3],
          backgroundColor: [
              'rgba(28, 200, 138, 0.4)',
              'rgba(28, 200, 138, 0.4)',
              'rgba(28, 200, 138, 0.4)',
              'rgba(28, 200, 138, 0.4)',
              'rgba(28, 200, 138, 0.4)',
              'rgba(28, 200, 138, 0.4)'
          ],
          borderColor: [
              'rgba(28, 200, 138, 0.4)',
              'rgba(28, 200, 138, 0.4)',
              'rgba(28, 200, 138, 0.4)',
              'rgba(28, 200, 138, 0.4)',
              'rgba(28, 200, 138, 0.4)',
              'rgba(28, 200, 138, 0.4)'
          ],
          borderWidth: 1
      }, {
        label: 'PMs',
        data: [1, 1, 1, 2, 2, 1],
        backgroundColor: [
            'rgba(220, 53, 69, 0.4)',
            'rgba(220, 53, 69, 0.4)',
            'rgba(220, 53, 69, 0.4)',
            'rgba(220, 53, 69, 0.4)',
            'rgba(220, 53, 69, 0.4)',
            'rgba(220, 53, 69, 0.4)'
        ],
        borderColor: [
            'rgba(220, 53, 69, 0.4)',
            'rgba(220, 53, 69, 0.4)',
            'rgba(220, 53, 69, 0.4)',
            'rgba(220, 53, 69, 0.4)',
            'rgba(220, 53, 69, 0.4)',
            'rgba(220, 53, 69, 0.4)'
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
                },
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
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