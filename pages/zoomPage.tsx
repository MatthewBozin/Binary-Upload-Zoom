import { Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import React from 'react';

import Example from 'client/components/Example';
const Zoom = dynamic(() => import('client/components/Zoom'), { ssr: false });

const ZoomPage: React.FC = () => {
  return (
    <div>
      <Example />
      <Zoom />
      <Typography>This is the second page.</Typography>
    </div>
  );
};

export default ZoomPage;
