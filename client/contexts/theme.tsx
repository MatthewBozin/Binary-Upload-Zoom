import { createTheme, ThemeProvider } from '@mui/material';
import cloneDeep from 'lodash/cloneDeep';
import React from 'react';

import { darkTheme } from 'client/themes/dark';
import { lightTheme } from 'client/themes/light';

// Set type definitions for this context
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

interface ThemeState {
  theme: Theme
}

type ThemeAction = {
  type: 'SET_THEME';
  theme: Theme;
}

// Create reducer & dispatch

// A reducer takes old state, some action, and returns the new state
// based on that action
type ThemeReducer = React.Reducer<ThemeState, ThemeAction>

// A dispatch is an action that's called to update a state
// in this case, this context
type ThemeDispatch = React.Dispatch<ThemeAction>

// Define the reducer
const reducer: ThemeReducer = (state, action) => {
  const newState = cloneDeep(state);

  switch (action.type) {
    case 'SET_THEME':
      newState.theme = action.theme;
      return newState;
    default:
      return newState;
  }
};

const defaultState: ThemeState = {
  theme: Theme.DARK,
};

const ThemeStateContext = React.createContext<ThemeState>(defaultState);
const ThemeDispatchContext = React.createContext<ThemeDispatch>({} as ThemeDispatch);

interface Props {
  children: React.ReactNode
}

const MuiThemeProvider: React.FC<Props> = ({ children }) => {
  const state = useThemeState();

  const theme = React.useMemo(
    () => createTheme(state.theme === Theme.LIGHT ? lightTheme : darkTheme),
    [state.theme],
  );

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

export const ThemeContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer<ThemeReducer>(reducer, defaultState);

  return (
    <ThemeDispatchContext.Provider value={dispatch}>
      <ThemeStateContext.Provider value={state}>
        <MuiThemeProvider>
          {children}
        </MuiThemeProvider>
      </ThemeStateContext.Provider>
    </ThemeDispatchContext.Provider>
  );
};

export const useThemeState = () => React.useContext(ThemeStateContext);
export const useThemeDispatch = () => React.useContext(ThemeDispatchContext);
