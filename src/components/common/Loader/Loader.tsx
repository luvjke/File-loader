import React from 'react';
// import axios from 'axios';

import { Button } from '../../ui/Button';
import styles from './Loader.module.scss';
import { useMethods } from '../../../hooks/useMethods';
import { Toast } from '../../ui/Toast';

export const Loader = () => {
  const [token, setToken] = React.useState('');
  const filePicker = React.useRef<HTMLInputElement>(null);

  const { handleFileChange, handleUploadFile, inputFile, removeFile, toastList, setToastList } =
    useMethods(token);

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
            version={'filled'}
            label={'Click to log in'}
            tag={'button'}
            onClick={() => handleAuthorization()}
          />
        </div>
      ) : (
        <div className={styles.loader_container}>
          <div className={styles.loader_box}>
            <div className={styles.loader_button}>
              <Button
                onClick={handleUploadFile}
                version={'filled'}
                label={'Publish now'}
                tag="button"
              />
            </div>
            <div className={styles.loader_files}>
              <Button onClick={handlePick} version={'custom'} label={'Add files'} tag="button" />
              <input
                type="file"
                onChange={handleFileChange}
                multiple={true}
                id="1"
                className={styles.hidden}
                ref={filePicker}
              />
            </div>
          </div>
          <ul className={styles.files_container}>
            {inputFile.map((file, index) => (
              <li className={styles.files_box} key={index}>
                <img className={styles.img} src={URL.createObjectURL(file)} alt={`img-${index}`} />
                <div className={styles.info_container}>
                  <h5 className={styles.filename}>{file.name.replace(/\.[^/.]+$/, '')}</h5>
                  <h5 className={styles.filename}>{file.type}</h5>
                </div>
                <div className={styles.delete_button}>
                  <Button
                    onClick={() => removeFile(index)}
                    version={'remove'}
                    label={'Delete'}
                    tag="button"
                  />
                </div>
              </li>
            ))}
          </ul>
          {toastList.length > 0 ? <Toast toastList={toastList} setToastList={setToastList} /> : ''}
        </div>
      )}
    </div>
  );
};
