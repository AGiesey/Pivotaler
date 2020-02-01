import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { BurndownDatapoint } from './burndownPivotalService';

interface BurndownChartProps {
  data: BurndownDatapoint[];
}

export const BurndownChart = (props: BurndownChartProps) => {
  return (
    <ResponsiveContainer>
      <LineChart data={props.data}>
        <Line type="monotone" dataKey="totalPoints" stroke="#8884d8" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  )
}