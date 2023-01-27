import dynamic from 'next/dynamic';
import React from 'react';

//dynamic makes this component not be server-side rendered
//because it has functions that happen on startup
const Streamer = dynamic(() => import('client/components/Streamer'), { ssr: false });

const ProtectedPage: React.FC = () => {
  return (
    <><Streamer /></>
  );
};

export default ProtectedPage;
