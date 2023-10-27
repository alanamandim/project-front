import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

import Grid from "@mui/material/Grid";
import { Button, FormLabel, TextField, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import sleep from "../../utils/Sleep";
import api from "../../services/api";

interface FormValues {
  email: string;
  senha: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [senha, setsenha] = useState<string>("");
  const userDataFromRegister = useContext(AuthContext);

  const goToRegister = () => {
    navigate("/register");
  };

  function handleLogin() {
    const inputElementEmail = document.getElementById(
      "email"
    ) as HTMLInputElement | null;
    if (inputElementEmail !== null) {
      const formEmail = inputElementEmail.value;
      setEmail(formEmail);
    }

    const inputElementsenha = document.getElementById(
      "senha"
    ) as HTMLInputElement | null;
    if (inputElementsenha !== null) {
      const formsenha = inputElementsenha.value;
      setsenha(formsenha);
    }
  }

  async function submitLogin() {
    const newUserData = {
      email: email,
      senha: senha,
    };

    // Automatic Request from Database
    //await api.post("/loginUsuario", newUserData);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("senha", senha);

    // Exemplo de como enviar o arquivo para o back-end usando fetch API.
    fetch(`http://localhost:8080/loginUsuario`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        // A resposta do servidor, se necessário.
        toast.success(`Login efetuado com sucesso!`, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        const TimeSleep = async () => {
          await sleep(2000);
          window.location.href = "/dashboard";
        };

        TimeSleep();
      })
      .catch((error) => {
        // Os erros, se houver.
        toast.error(`Ops! Login ou senha incorreto!`, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });

    // await axios
    //   .post(api + "/loginUsuario", newUserData)
    //   .then((res) => {
    //     console.log(newUserData.email, newUserData.senha);
    //     toast.success(`Login efetuado com sucesso!`, {
    //       position: "top-right",
    //       autoClose: 4000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     });

    //     const TimeSleep = async () => {
    //       await sleep(2000);
    //       window.location.href = "/dashboard";
    //     };

    //     TimeSleep();
    //   })
    //   .catch(function () {
    //     console.log(newUserData.email, newUserData.senha);
    //     toast.error(`Ops! Login ou senha incorreto!`, {
    //       position: "top-right",
    //       autoClose: 4000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     });
    //   });

    // Manual request
    // FIXME: Remove it when sync with database
  }

  return (
    <form onChange={handleLogin}>
      <Grid
        container
        columnSpacing={2}
        mt={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item mb={3}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            id="email"
            name="email"
            type="email"
            fullWidth
            value={email}
          />
        </Grid>
        <Grid item mb={3} display="flex" flexDirection="column">
          <FormLabel htmlFor="senha">Senha</FormLabel>
          <TextField id="senha" name="senha" fullWidth value={senha} />
        </Grid>
        <Grid item mb={3}>
          <Button variant="contained" size="large" onClick={submitLogin}>
            LOGIN
          </Button>
        </Grid>
        <Grid item mb={3}>
          <Typography
            variant="h6"
            onClick={goToRegister}
            style={{
              color: "royalblue",
              transition: "color 0.3s",
              cursor: "pointer",
            }}
          >
            {" "}
            Não tem cadastro? Clique aqui!
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
