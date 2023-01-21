import React from 'react';

const ProtectedPage: React.FC = () => {
  return (
    <div>only authed users should see this</div>
  );
};

export default ProtectedPage;
