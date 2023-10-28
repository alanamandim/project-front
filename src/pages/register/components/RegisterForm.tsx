import { useContext, useState } from "react";
import FormLabel from "@mui/material/FormLabel";
import { AuthContext, IRegisterUser } from "../../../context/AuthContext";

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
import sleep from "../../../utils/Sleep";

const RegisterForm = () => {
  const [senha, setsenha] = useState<string>("");
  const [checksenha, setChecksenha] = useState<string>("");
  const [showsenha, setShowsenha] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [saram, setSaram] = useState<string>("");

  const handleClickShowsenha = () => setShowsenha((show) => !show);

  function collectDataFromForm() {
    const inputElementName = document.getElementById(
      "name"
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
<<<<<<< HEAD
      const newUserData: IRegisterUser = {
        email: email,
        name: name,
        saram: saram,
        senha: senha,
      };

=======
>>>>>>> b6161c3bce538e23b59aa57ad99b3e86e329849d
      const formData = new FormData();
      formData.append("nome", name);
      formData.append("saram", saram);
      formData.append("email", email);
      formData.append("senha", senha);

      console.log(formData);

      // Exemplo de como enviar o arquivo para o back-end usando fetch API.
      fetch(`http://localhost:8080/registraUsuario`, {
        method: "POST",
        body: formData,
      })
        .then((response: any) => {
          toast.success(`${response.body}`, {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          console.log(response);

          const TimeSleep = async () => {
            await sleep(2000);
            window.location.href = "/";
          };

          userContext.setUser({
            name: newUserData.name,
            email: newUserData.email,
            senha: newUserData.senha,
            saram: newUserData.saram,
            photo: "",
          });

          TimeSleep();
        })
        .catch((error) => {
          // Os erros, se houver.
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
            <FormLabel htmlFor="name">
              Foto (Envie uma foto se for motorista e se enviou o formulário
              abaixo!)
            </FormLabel>
            <ImageUploader id={saram} />
          </Grid>
          <Grid item mb={3}>
            <FormLabel htmlFor="name">Nome de Guerra</FormLabel>
            <TextField id="name" name="name" fullWidth value={name} />
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
