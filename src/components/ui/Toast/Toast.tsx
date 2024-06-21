import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';

import styles from './Toast.module.scss';
import { ToastProps } from './Toast.props';

export const Toast = ({ toastList, setToastList }: ToastProps) => {
  const root = document.getElementById('portal');

  const handleDeleteToast = useCallback(
    (id: number) => {
      console.log(id);
      const toastListItem = toastList.filter((e) => e.id !== id);
      setToastList(toastListItem);
    },
    [toastList, setToastList]
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (toastList.length) {
        handleDeleteToast(toastList[0].id);
      }
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [toastList, handleDeleteToast]);

  return root
    ? ReactDOM.createPortal(
        <div className={styles.container}>
          {toastList.map((toast, index) => (
            <div
              key={index}
              className={styles.notification}
              style={{ backgroundColor: toast.backgroundColor }}
            >
              <button onClick={() => handleDeleteToast(toast.id)}>X</button>

              <p style={{ backgroundColor: toast.backgroundColor }} className={styles.title}>
                {toast.title}
              </p>
              <p style={{ backgroundColor: toast.backgroundColor }} className={styles.description}>
                {toast.description}
              </p>
            </div>
          ))}
        </div>,
        root
      )
    : null;
};
