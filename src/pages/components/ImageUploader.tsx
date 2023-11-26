import React, { useState } from "react";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";

function ImageUploader() {
  const [photo, setPhoto] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setPhoto(file);
  };

  const handleUpload = () => {
    if (photo) {
      const allowedExtensions = [".jpg", ".jpeg"];
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
        fetch(`http://localhost:8080/upload`, {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            toast.success("Imagem enviada, só aguardar aprovação!");
            localStorage.removeItem("saram");
          })
          .catch((error) => {
            toast.error("Imagem não enviada!");
          });
      }
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUploader;
