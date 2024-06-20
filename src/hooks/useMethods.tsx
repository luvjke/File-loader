import axios from 'axios';
import React, { ChangeEvent } from 'react';

export const useMethods = (token: string) => {
  const [inputFile, setInputFile] = React.useState<File[]>([]);
  console.log(inputFile);

  // const imageURl = URL.createObjectURL(inputFile[0]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file && file.length > 0) {
      const fileList = file;

      setInputFile((prevFiles) => [...prevFiles, ...Array.from(fileList)]);
    }
  };
  const removeFile = (index: number) => {
    setInputFile((prevFiles) => prevFiles.filter((_, i) => i !== index));
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
      } catch (error) {
        alert(error);
      } finally {
        alert('Файл загуржен');
      }
    }
  };
  return { handleFileChange, handleUploadFile, inputFile, removeFile };
};
