import { Box, IconButton } from '@mui/material';
import DarkIcon from '@mui/icons-material/Brightness4';
import LightIcon from '@mui/icons-material/Brightness7';
import React from 'react';

import { useThemeState, useThemeDispatch, Theme } from 'client/contexts/theme';

const SwitchModeButton = () => {
  const state = useThemeState();
  const dispatch = useThemeDispatch();

  const onToggle = () => {
    const theme = state.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    dispatch({ type: 'SET_THEME', theme });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'right',
      }}
    >
      {state.theme} mode
      <IconButton
        sx={{ ml: 1 }}
        onClick={onToggle /* colorMode.toggleColorMode */}
        color="inherit"
      >
        {state.theme === Theme.DARK ? <LightIcon /> : <DarkIcon />}
      </IconButton>
    </Box>
  );
};

export default SwitchModeButton;
