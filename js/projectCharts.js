import {projChartVals} from './fBaseProjects.js';

// Priority Projects Pie Chart
var ctx = document.getElementById('priorityProjects');
new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Low', 'Mid', 'High'],
    datasets: [{
      label: 'Project(s)',
      data: [projChartVals.low, projChartVals.mid, projChartVals.high],
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
    plugins:{
      legend:{display: true}

    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0)",
        },
        display: false
      }
    }
  }
});