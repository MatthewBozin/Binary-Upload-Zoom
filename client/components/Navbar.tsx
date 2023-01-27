import Button from '@mui/material/Button';
import Link from 'next/link';
import React from 'react';
import Cookies from 'universal-cookie';

import { AUTH_COOKIE_NAME } from 'shared/constants';

const cookies = new Cookies();

interface Link {
  label: string;
  href: string;
  external?: boolean;
}

const baseLinks: Link[] = [
  { label: 'Home', href: '/' },
  { label: 'SecondPage', href: '/secondPage', external: true },
];

const unAuthedLinks: Link[] = [
  { label: 'Login', href: '/login', external: true },
];

const authedLinks: Link[] = [
  { label: 'Protected', href: '/protected' },
  { label: 'Logout', href: '/logout' },
];

const Navbar: React.FC = () => {
  const isAuthed = !!cookies.get(AUTH_COOKIE_NAME);

  const links = [
    ...baseLinks,
    ...(isAuthed ? authedLinks : unAuthedLinks),
  ];

  return (
    <nav>
      {links.map(link => (
        <Button key={link.label} variant='contained'>
          {link.external ? (
            <a href={link.href}>{link.label}</a>
          ) : (
            <Link href={link.href}>{link.label}</Link>
          )}
        </Button>
      ))}
    </nav>
  );
};

export default Navbar;
