import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { BurndownDatapoint } from './burndownInterfaces';

interface BurndownChartProps {
  data: BurndownDatapoint[];
}

export const BurndownChart = (props: BurndownChartProps) => {
  return (
    <ResponsiveContainer width="90%" height="90%">
      <LineChart data={props.data}>
        <Line type="monotone" dataKey="totalPoints" stroke="#8884d8" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  )
}