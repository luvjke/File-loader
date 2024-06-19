import React from 'react';
// import axios from 'axios';

import { Button } from '../../ui/Button';
import styles from './Loader.module.scss';
import { useMethods } from '../../../hooks/useMethods';

export const Loader = () => {
  const [token, setToken] = React.useState('');
  const { handleFileChange, handleUploadFile, inputFile } = useMethods(token);
  // // console.log(inputFile);
  // const imageUrl = URL.createObjectURL(inputFile[0]);
  // console.log(imageUrl);
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

  // const getItems = () => {
  //   try {
  //     const responce = axios.get(`https://cloud-api.yandex.net/v1/disk/resources/files`, {
  //       headers: { Authorization: `OAuth ${token}` },
  //     });
  //   } catch (error) {
  //     alert(error);
  //   }
  // };
  React.useEffect(() => {
    if (window.location.hash) {
      getToken();
    }
  }, []);

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
        <div className={styles.loader_container}>
          <button onClick={handleUploadFile}>жМИ</button>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*,.png,.jpg,.web"
            multiple={true}
            id="1"
            className={styles.input}
          />
          <label htmlFor="1">
            {inputFile.map((file, index) => (
              <img
                className={styles.img}
                key={index}
                src={URL.createObjectURL(file)}
                alt={`img-${index}`}
              />
            ))}
          </label>
        </div>
      )}
    </div>
  );
};
