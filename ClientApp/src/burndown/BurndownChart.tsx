import React, { useEffect, useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { getIterationBurndown } from './burndownApiService';
import Chart from 'chart.js';
import classes from '*.module.css';
import { SportsRugbySharp } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    width: 'calc(100% - 32px)',
    height: 'calc(100% - 32px)',
  },
  chartCanvas: {
    height: '100%',
  }
}))

interface BurndownChartProps {
  iterationId: number;
}

export const BurndownChart = (props: BurndownChartProps) => {
  const classes = useStyles();
  const [data, setData] = useState();

  useEffect(() => {
    getIterationBurndown(props.iterationId)
      .then(data => {
        setData(data);
      })
  }, [props.iterationId])

  useEffect(() => {
    if (!data) {
      return;
    }
    console.log("Data", data);
    renderChart(data)
  }, [data])


  const renderChart = (data: any) => {
    const ctx: HTMLCanvasElement = document.getElementById('burndownChart') as HTMLCanvasElement;
    
    console.log("Data", data);

    const ideal = data.idealBurndown;
    const points = data.pointBurndown;
    const everhour = data.everhourBurndown;
    
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11",  "12", "13", "14"],
        datasets: [
          {
            label: 'Ideal',
            data: ideal,
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
        scales: {
          yAxes: [{
            ticks: {
                beginAtZero: true
            }
          }]
        }
      }
    })
    // var myChart = new Chart(ctx, {
    //   type: 'bar',
    //   data: {
    //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //     datasets: [{
    //       label: '# of Votes',
    //       data: [12, 19, 3, 5, 2, 3],
    //       backgroundColor: [
    //           'rgba(255, 99, 132, 0.2)',
    //           'rgba(54, 162, 235, 0.2)',
    //           'rgba(255, 206, 86, 0.2)',
    //           'rgba(75, 192, 192, 0.2)',
    //           'rgba(153, 102, 255, 0.2)',
    //           'rgba(255, 159, 64, 0.2)'
    //       ],
    //       borderColor: [
    //           'rgba(255, 99, 132, 1)',
    //           'rgba(54, 162, 235, 1)',
    //           'rgba(255, 206, 86, 1)',
    //           'rgba(75, 192, 192, 1)',
    //           'rgba(153, 102, 255, 1)',
    //           'rgba(255, 159, 64, 1)'
    //       ],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       yAxes: [{
    //           ticks: {
    //               beginAtZero: true
    //           }
    //       }]
    //     }
    //   }
    //   });
  }

  return (
    <div className={classes.root}>
      <canvas id="burndownChart" className={classes.chartCanvas}></canvas>
    </div>
  )
}