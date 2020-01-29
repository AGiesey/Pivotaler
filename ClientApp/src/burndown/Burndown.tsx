import React, { useEffect } from 'react';
import { getSprintBacklogStories } from '../pivotalApiServices/stories';

const Burndown: React.FC = () => {
  
  useEffect(() => {
    getSprintBacklogStories().then(result => console.log(result))
  }, [])

  return (
    <div>
      This is the burndown
    </div>
  )
}

export default Burndown;