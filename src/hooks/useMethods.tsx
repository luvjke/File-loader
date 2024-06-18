import axios from 'axios';
import React, { ChangeEvent } from 'react';

export const useMethods = (token: string) => {
  const [inputFile, setInputFile] = React.useState<File[]>([]);

  const ENCODED_PATH = encodeURIComponent(inputFile[0]?.name);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file && file.length > 0) {
      const fileList = Array.from(file);
      setInputFile(fileList);
    }
  };

  const handleUploadFile = async () => {
    try {
      const response = await axios.get(
        `https://cloud-api.yandex.net/v1/disk/resources/upload?path=${ENCODED_PATH}`,
        {
          headers: {
            Authorization: `OAuth ${token}`,
          },
        }
      );
      const POST_URL = response.data.href;
      await axios.put(POST_URL, inputFile);
    } catch (error) {
      alert(error);
    }
  };
  return { handleFileChange, handleUploadFile };
};
