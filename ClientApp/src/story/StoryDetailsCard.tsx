import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';

interface StoryDetailsCardProps {
  data: any;
}

export const StoryDetailsCard = (props: StoryDetailsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <Typography>MY STORY</Typography>
      </CardHeader>
      <CardContent>
        My story body
      </CardContent>
    </Card>
  )
}