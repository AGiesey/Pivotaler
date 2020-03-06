import React, { useEffect, useState } from 'react';
import { makeStyles, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { getIterationBurndown, getRecentIterations } from './burndownApiService';
import Chart from 'chart.js';
import { IterationModel } from './burndownDataModels';
import { burndownChartConfig } from './burndownChartConfig';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    width: 'calc(100% - 32px)',
    height: 'calc(100% - 32px)',
    display: 'flex',
    flexDirection: 'column'
  },
  selectSprintContainer: {
    flexBasis: '5em',
    flexShrink: 0
  },
  selectSprint: {
    minWidth: '12em',
  },
  chartContainer: {
    flexGrow: 1,
  },
  chartCanvas: {
    height: '100%',
  }
}))

interface BurndownChartProps {
  iterationId: number;
  onSetCurrentIterationId: Function;
}

interface IterationOptions {
  key: any;
  value: string;
}

export const BurndownChart = (props: BurndownChartProps) => {
  const classes = useStyles();
  const [data, setData] = useState();
  const [iterationOptions, setIterationOptions] = useState([] as IterationOptions[]);
  const [currentIterationId, setCurrentIterationId] = useState("");
  const [currentChart, setCurrentChart] = useState();

  useEffect(() => {
    getIterationBurndown(props.iterationId)
      .then(data => {
        setData(data);
      })
  }, [props.iterationId])

  useEffect(() => {
    var maybeInt = parseInt(currentIterationId);

    if (!isNaN(maybeInt)) {
      props.onSetCurrentIterationId(maybeInt);
    }
    
  }, [currentIterationId])

  useEffect(() => {
    getRecentIterations()
      .then(iterations => {
        const options = iterations.map((iteration: IterationModel) => (
          {
            key: iteration.iterationId, 
            value: `${moment(iteration.startDate).format('MMM Do')} - ${moment(iteration.endDate).format('MMM Do')}`
          }
        ))

        setIterationOptions(options);
      })
  }, [])

  useEffect(() => {
    if (!data) {
      return;
    }
    renderChart(data)
  }, [data])


  const renderChart = (data: any) => {
    const ctx: HTMLCanvasElement = document.getElementById('burndownChart') as HTMLCanvasElement;
    
    const ideal = data.idealBurndown;
    const idealEverhour = data.idealEverhourBurndown;
    const points = data.pointBurndown;
    const everhour = data.everhourBurndown;

    if (currentChart) {
      currentChart.data = burndownChartConfig(ideal, idealEverhour, points, everhour);
      currentChart.update();
    } else {
      var newChart = new Chart(ctx, burndownChartConfig(ideal, idealEverhour, points, everhour));
      setCurrentChart(newChart)
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.selectSprintContainer}>
        <FormControl className={classes.selectSprint}>
          <InputLabel>Select Sprint</InputLabel>
          <Select
            value={currentIterationId}
            onChange={(e) => setCurrentIterationId(e.target.value as string)}
          >
            {iterationOptions.map(option => <MenuItem key={option.key} value={option.key.toString()}>{option.value}</MenuItem>)}
            
          </Select>
        </FormControl>
      </div>
      <div className={classes.chartContainer}>
        <canvas id="burndownChart" className={classes.chartCanvas}></canvas>
      </div>
    </div>
  )
}