import React from 'react';
import Example from 'client/components/Example';
import { Typography } from '@mui/material';

const Something: React.FC = () => {
  return (
    <div>
      <Example />
      <Typography>This is the second page.</Typography>
    </div>
  );
};

export default Something;
