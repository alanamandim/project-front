import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-toastify";

//https://img.ibxk.com.br/2017/07/13/13160112901226.jpg?ims=328x

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function ImageUploader() {
  const [photo, setPhoto] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setPhoto(file);
  };

  const handleUpload = () => {
    if (photo) {
      // Aqui você pode enviar o arquivo para o back-end usando uma solicitação POST.

      const allowedExtensions = [".jpg", ".jpeg"]; // , '.jpeg'
      const fileExtension = photo.name.slice(
        ((photo.name.lastIndexOf(".") - 1) >>> 0) + 2
      );

      if (!allowedExtensions.includes(`.${fileExtension}`)) {
        alert("Por favor, selecione um arquivo JPG válido.");
        return;
      }

      const dadoSalvo = localStorage.getItem("saram");
      if (dadoSalvo) {
        const id = JSON.parse(dadoSalvo);
        const formData = new FormData();
        formData.append("photo", photo);
        formData.append("id", `${id}`);
        // formData.append('id', '6783452');
        console.log(formData);

        // Exemplo de como enviar o arquivo para o back-end usando fetch API.
        fetch(`http://localhost:8080/upload`, {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            // A resposta do servidor, se necessário.
            toast.success("Imagem enviada, só aguardar aprovação!");
          })
          .catch((error) => {
            // Os erros, se houver.
            toast.error("Imagem não enviada!");
          });
      }
    }
  };

  return (
    <div>
      {/* <Button
        style={{ margin: "30px" }}
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>
      <Button onClick={handleUpload}>Upload</Button>
      */}
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUploader;
