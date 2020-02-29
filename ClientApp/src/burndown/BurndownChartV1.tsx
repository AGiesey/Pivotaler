import React, { useEffect, useState } from 'react';
//import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { BurndownDatapoint } from './burndownInterfaces';
import { Typography } from '@material-ui/core';
import { getIterationBurndown } from './burndownApiService';

interface BurndownChartProps {
  data: BurndownDatapoint[];
}

export const BurndownChart = (props: BurndownChartProps) => {
  const [iteration, setIteration] = useState();
  
  useEffect(() => {
    getIterationBurndown(3)
      .then(iteration => setIteration(iteration))
  },[])

  const getBurndown = () => {
    return (
      <pre>{JSON.stringify(iteration)}</pre>
    )
  }

  return (
    <div>
      {
        iteration
          ? getBurndown()
          : <Typography>Loading ...</Typography>
      }
    </div>
    
    
    // <ResponsiveContainer width="90%" height="90%">
    //   <LineChart data={props.data}>
    //     <Line type="monotone" dataKey="totalPoints" stroke="#8884d8" />
    //     <XAxis dataKey="date" />
    //     <YAxis />
    //     <Tooltip />
    //   </LineChart>
    // </ResponsiveContainer>
  )
}