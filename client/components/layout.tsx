import { CssBaseline } from '@mui/material';
import React from 'react';
import Navbar from './Navbar';

import { ThemeContextProvider } from 'client/contexts/theme';
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
