import React from 'react';

interface ThemeContextInterface {
  theme: 'dark' | 'light';
  handleToggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextInterface>({
  theme: 'dark',
  handleToggleTheme: () => null,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const STORED_THEME = localStorage.getItem('theme');

  const CURRENT_THEME = STORED_THEME ? (STORED_THEME as 'dark' | 'light') : 'dark';

  const [theme, setTheme] = React.useState(CURRENT_THEME);

  const handleToggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };
  return (
    <ThemeContext.Provider value={{ theme, handleToggleTheme }}>
      <main className={`${theme}`}>{children}</main>
    </ThemeContext.Provider>
  );
};
