import { CssBaseline } from '@mui/material';
import React from 'react';

import { ThemeContextProvider } from 'client/contexts/theme';

import Navbar from './Navbar';
import SwitchModeButton from './SwitchModeButton';

const Layout: React.FC = ({ children }) => {
  return (
    <ThemeContextProvider>
      <CssBaseline enableColorScheme />
      <Navbar />
      <SwitchModeButton />
      <main>{children}</main>
    </ThemeContextProvider>
  );
};

export default Layout;
