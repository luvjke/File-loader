import React, { useContext } from 'react';

import styles from './Header.module.scss';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';

export const Header = () => {
  const { theme, handleToggleTheme } = useContext(ThemeContext);
  // const [chacked, setChacked] = React.useState(false);
  // console.log(chacked);
  // const handleSetTheme = () => {
  //   setChacked((prev) => !prev);
  // };
  // const handleChangeTheme = (chacked: boolean) => {
  //   if (chacked) {
  //     document.body.setAttribute('dark', '');
  //   } else {
  //     document.body.removeAttribute('dark');
  //   }
  // };
  return (
    <header className={styles.header}>
      <div onClick={() => handleToggleTheme()}>
        {theme === 'light' ? <div>Solar</div> : <div>Luna</div>}
      </div>
    </header>
  );
};
