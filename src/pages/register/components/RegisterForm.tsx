import { useState } from "react";
import FormLabel from "@mui/material/FormLabel";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";

import { IconEye, IconEyeOff } from "@tabler/icons-react";
import ImageUploader from "../../components/ImageUploader";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [senha, setsenha] = useState<string>("");
  const [checksenha, setChecksenha] = useState<string>("");
  const [showsenha, setShowsenha] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [nome, setName] = useState<string>("");
  const [saram, setSaram] = useState<string>("");

  const handleClickShowsenha = () => setShowsenha((show) => !show);

  function collectDataFromForm() {
    const inputElementName = document.getElementById(
      "nome"
    ) as HTMLInputElement | null;
    if (inputElementName !== null) {
      const formName = inputElementName.value;
      setName(formName);
    }

    const inputElementEmail = document.getElementById(
      "email"
    ) as HTMLInputElement | null;
    if (inputElementEmail !== null) {
      const formEmail = inputElementEmail.value;
      setEmail(formEmail);
    }

    const inputElementSaram = document.getElementById(
      "saram"
    ) as HTMLInputElement | null;
    if (inputElementSaram !== null) {
      const formSaram = inputElementSaram.value;
      setSaram(formSaram);
    }

    const inputElementsenha = document.getElementById(
      "senha"
    ) as HTMLInputElement | null;
    if (inputElementsenha !== null) {
      const formsenha = inputElementsenha.value;
      setsenha(formsenha);
    }

    const inputElementChecksenha = document.getElementById(
      "check-senha"
    ) as HTMLInputElement | null;
    if (inputElementChecksenha !== null) {
      const formChecksenha = inputElementChecksenha.value;
      setChecksenha(formChecksenha);
    }
  }

  function getValuesFromForm() {
    if (senha === checksenha) {
      const formData = { nome, saram, email, senha };
      fetch(`http://localhost:8080/registraUsuario`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response: any) => {
          if (response.status === 200) {
            toast.success(`Registro efetuado com sucesso!`, {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            localStorage.setItem("saram", JSON.stringify(saram));
            toast.success(
              "Tudo certo, agora nos envie uma foto se for motorista!"
            );
          } else if (response.status === 401) {
            toast.error("Ops! Login ou senha incorreto.");
          } else {
            toast.error("Ops! Login ou senha incorreto.");
          }
        })
        .catch((error) => {
          toast.error(`Ops! Algo está incorreto!`, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } else {
      toast.error(`Oops! The senhas do not match!`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        onChange={() => collectDataFromForm()}
      >
        <Grid
          item
          container
          columnSpacing={2}
          mt={2}
          direction="column"
          justifyContent="center"
        >
          <Grid item mb={3}>
            <FormLabel htmlFor="nome">
              Foto (Envie uma foto se for motorista e se enviou o formulário
              abaixo!)
            </FormLabel>
            <ImageUploader />
          </Grid>
          <Grid item mb={3}>
            <FormLabel htmlFor="nome">Nome de Guerra</FormLabel>
            <TextField id="nome" name="nome" fullWidth value={nome} />
          </Grid>
          <Grid item mb={3}>
            <FormLabel htmlFor="saram">SARAM</FormLabel>
            <TextField id="saram" name="saram" fullWidth value={saram} />
          </Grid>
          <Grid item mb={3}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField id="email" name="email" fullWidth value={email} />
          </Grid>
          <Grid item mb={3}>
            <FormLabel htmlFor="senha">Senha</FormLabel>
            <OutlinedInput
              type={showsenha ? "text" : "senha"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle senha visibility"
                    onClick={handleClickShowsenha}
                    edge="end"
                  >
                    {showsenha ? <IconEye /> : <IconEyeOff />}
                  </IconButton>
                </InputAdornment>
              }
              id="senha"
              name="senha"
              value={senha}
              fullWidth
            />
          </Grid>
          <Grid item mb={3}>
            <FormLabel htmlFor="confirm_senha">Confirmar Senha</FormLabel>
            <TextField
              id="check-senha"
              name="check-senha"
              fullWidth
              value={checksenha}
            />
          </Grid>
          <Grid item mb={3} alignItems="center">
            <Button
              variant="contained"
              size="large"
              type="submit"
              onClick={getValuesFromForm}
            >
              CADASTRAR
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default RegisterForm;
