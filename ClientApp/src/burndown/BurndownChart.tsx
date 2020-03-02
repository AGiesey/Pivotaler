import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { getIterationBurndown } from './burndownApiService';
import Chart from 'chart.js';

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
  }

  return (
    <div className={classes.root}>
      <canvas id="burndownChart" className={classes.chartCanvas}></canvas>
    </div>
  )
}