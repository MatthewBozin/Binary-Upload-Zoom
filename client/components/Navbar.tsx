import React from 'react';
import Button from '@mui/material/Button';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <>
      <Button>
        <Link href="/">Home</Link>
      </Button>
      <Button>
        <Link href="/something">Something</Link>
      </Button>
    </>
  );
};

export default Navbar;