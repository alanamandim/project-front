import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    console.log(selectedFile)
    if (selectedFile) {
      // Aqui você pode enviar o arquivo para o back-end usando uma solicitação POST.
      const formData = new FormData();
      formData.append('image', selectedFile);
      
      // Exemplo de como enviar o arquivo para o back-end usando fetch API.
      fetch(`http://localhost:8000/upload`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          // A resposta do servidor, se necessário.
          console.log("DEU TUDO CERTO!")
        })
        .catch((error) => {
          // Os erros, se houver.
          console.log("NÃO DEU TUDO CERTO!")
        });
    }
  };

  return (
    <div>
      <Button style={{margin: '30px'}} component="label" variant="contained" onClick={handleUpload} startIcon={<CloudUploadIcon />}>
        Upload file
        <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFileChange} />
      </Button>
      {/* <input type="file" accept="image/*" onChange={handleFileChange} /> */}
      {/* <Button onClick={handleUpload}>Upload</Button> */}
    </div>
  );
}

export default ImageUploader;



