// Priority Projects Pie Chart
var ctx = document.getElementById("priorityProjectsBarChart2");
var priorityProjectsBarChart2 = new Chart(ctx, {
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