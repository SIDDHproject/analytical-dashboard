/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('vortex-theme');
    return saved || 'cyberpunk';
  });

  useEffect(() => {
    const body = document.body;
    // Remove previous theme- classes
    const classes = Array.from(body.classList);
    classes.forEach(c => {
      if (c.startsWith('theme-')) {
        body.classList.remove(c);
      }
    });
    // Add new theme class
    body.classList.add(`theme-${theme}`);
    localStorage.setItem('vortex-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
