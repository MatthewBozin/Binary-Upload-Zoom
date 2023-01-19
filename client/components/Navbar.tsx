import Button from '@mui/material/Button';
import Link from 'next/link';
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav>
      <Button variant='contained'>
        <Link href="/">Home</Link>
      </Button>
      <Button variant='contained'>
        <Link href="/secondPage">Second Page</Link>
      </Button>
    </nav>
  );
};

export default Navbar;
