//@ts-ignore
import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';

import styles from './Toast.module.scss';
import { ToastListProps, ToastProps } from './Toast.props';

export const Toast = ({ toastList, setToastList }: ToastProps) => {
  const root = document.getElementById('portal');

  const handleDeleteToast = useCallback(
    (id: number) => {
      console.log(id);
      const toastListItem = toastList.filter((toast) => toast.id !== id);
      setToastList(toastListItem);
    },
    [toastList, setToastList]
  );

  const showToast = (type: string): void => {
    let toastProperties: ToastListProps = {
      id: toastList.length,
      title: '',
      description: '',
      backgroundColor: '',
    };

    switch (type) {
      case 'success':
        toastProperties = {
          id: toastList.length + 1,
          title: 'Success',
          description: 'FIle is uploaded',
          backgroundColor: '#5cb85c',
        };
        break;
      case 'error':
        toastProperties = {
          id: toastList.length + 1,
          title: 'Error',
          description: 'Something went wrong',
          backgroundColor: '#471717',
        };
        break;
    }
    if (toastProperties) {
      setToastList((prevToastList) => [...prevToastList, toastProperties]);
    }
  };
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
  showToast('success');
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
