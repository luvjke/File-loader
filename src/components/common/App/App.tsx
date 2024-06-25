import React from 'react';

import { AppRouter } from '../AppRoutes/AppRoutes';
import { Header } from '../Header';
import { ThemeProvider } from '../ThemeProvider';

export const App = () => {
  return (
    <>
      <ThemeProvider>
        <Header />
        <AppRouter />
      </ThemeProvider>
    </>
  );
};
