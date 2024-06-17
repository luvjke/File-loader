import React from 'react';

import { Button } from '../../ui/Button';
import styles from './Loader.module.scss';

export const Loader = () => {
  const [token, setToken] = React.useState('');

  const TOKEN_URL = `https://oauth.yandex.ru/authorize?response_type=token&client_id=${process.env.REACT_APP_CLIENT_ID}`;

  const handleAuthorization = () => {
    window.location.href = TOKEN_URL;
  };

  const getToken = () => {
    const urlParams = new URLSearchParams(window.location.href.split('#')[1]);
    // console.log(window.location.href.split('#')[0]);
    // console.log(window.location.href.split('#')[1]);
    const token_string = urlParams.get('access_token');

    if (!token_string) {
      console.log('ER');
    } else {
      setToken(token_string);
    }
  };
  React.useEffect(() => {
    if (window.location.hash) {
      getToken();
    }
  }, []);
  console.log(token);
  return (
    <div>
      {!token ? (
        <div className={styles.autorization_button}>
          <Button
            version={'unfilled'}
            label={'Нажми для авторизации'}
            tag={'button'}
            onClick={() => handleAuthorization()}
          />
        </div>
      ) : (
        <div>dsadas</div>
      )}
    </div>
  );
};
