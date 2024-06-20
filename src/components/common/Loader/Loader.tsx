import React from 'react';
// import axios from 'axios';

import { Button } from '../../ui/Button';
import styles from './Loader.module.scss';
import { useMethods } from '../../../hooks/useMethods';

export const Loader = () => {
  const [token, setToken] = React.useState('');
  const filePicker = React.useRef<HTMLInputElement>(null);

  const { handleFileChange, handleUploadFile, inputFile, removeFile } = useMethods(token);
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
  const handlePick = () => {
    filePicker?.current?.click();
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
          <button onClick={handlePick}>dasda</button>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*,.png,.jpg,.web"
            multiple={true}
            id="1"
            className={styles.hidden}
            ref={filePicker}
          />
          <label>
            {inputFile.map((file, index) => (
              <div key={index}>
                <button onClick={() => removeFile(index)}>Удаляй</button>
                <img
                  className={styles.img}
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`img-${index}`}
                />
              </div>
            ))}
          </label>
        </div>
      )}
    </div>
  );
};
