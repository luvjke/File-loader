import React, { ChangeEvent } from 'react';
import axios from 'axios';

import { ToastListProps } from '../components/ui/Toast/Toast.props';

export const useMethods = (token: string) => {
  const [inputFile, setInputFile] = React.useState<File[]>([]);
  const [toastList, setToastList] = React.useState<ToastListProps[]>([]);
  console.log(toastList);

  const removeFile = (index: number) => {
    setInputFile((prevFiles) => prevFiles.filter((_, i) => i !== index));
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
      } catch (error) {}
    }
  };

  return { handleFileChange, handleUploadFile, inputFile, removeFile, toastList, setToastList };
};
