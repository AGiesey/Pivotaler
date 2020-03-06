export const burndownChartConfig = (ideal: any, idealEverhour: any, points: any, everhour: any) => ({
  type: 'line',
  data: {
    labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    datasets: [
      {
        label: 'Ideal Pivotal Burndown',
        data: ideal,
        backgroundColor: 'rgba(0,0,0,0.04)',
      },
      {
        label: 'Ideal Everhour Burndown',
        data: idealEverhour,
        backgroundColor: 'rgba(0,0,0,0.04)'
      },
      {
        label: 'Points',
        data: points,
        borderColor: 'orange',
        backgroundColor: 'rgba(0,0,0,0)'
      },
      {
        label: 'Everhour',
        data: everhour,
        borderColor: 'purple',
        backgroundColor: 'rgba(0,0,0,0)'
      }
    ]
  },
  options: {
    responsive: false,
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        ticks: {
            beginAtZero: true,
            suggestedMin: 0
        }
      }]
    }
  }
})