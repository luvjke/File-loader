import React, { ChangeEvent } from 'react';
import axios from 'axios';

import { ToastListProps } from '../components/ui/Toast/Toast.props';

export const useMethods = (token: string) => {
  const [inputFile, setInputFile] = React.useState<File[]>([]);
  const [toastList, setToastList] = React.useState<ToastListProps[]>([]);
  console.log(toastList);
  // console.log(inputFile);

  const removeFile = (index: number) => {
    setInputFile((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

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
      default:
        toastProperties = {
          id: toastList.length,
          title: '',
          description: '',
          backgroundColor: '',
        };
    }
    if (toastProperties) {
      setToastList((prevToastList) => [...prevToastList, toastProperties]);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file && file.length > 0) {
      const fileList = file;
      setInputFile((prevFiles) => [...prevFiles, ...Array.from(fileList)]);
    }
  };

  const handleUploadFile = async () => {
    for await (const file of inputFile) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.get(
          `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${encodeURIComponent(
            file.name
          )}`,
          {
            headers: {
              Authorization: `OAuth ${token}`,
            },
          }
        );
        const POST_URL = response.data.href;
        await axios.put(POST_URL, formData);
        showToast('success');
      } catch (error) {
        showToast('error');
      }
    }
  };
  return { handleFileChange, handleUploadFile, inputFile, removeFile, toastList, setToastList };
};
