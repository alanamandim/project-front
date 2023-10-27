import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import Grid from "@mui/material/Grid";
import { Button, FormLabel, TextField, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import sleep from "../../utils/Sleep";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [senha, setsenha] = useState<string>("");
  const { setUser } = useContext(AuthContext);

  const goToRegister = () => {
    navigate("/register");
  };

  async function submitLogin() {
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

    const formData = new FormData();
    formData.append("email", email);
    formData.append("senha", senha);

    console.log(formData);

    // Exemplo de como enviar o arquivo para o back-end usando fetch API.
    fetch(`http://localhost:8080/loginUsuario`, {
      method: "POST",
      body: formData,
    })
      .then((res: any) => {
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

        setUser(res);
        window.localStorage.setItem("user", res.data);

        // const TimeSleep = async () => {
        //   await sleep(2000);
        //   window.location.href = "/dashboard";
        // };

        // TimeSleep();
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
  }

  return (
    <form>
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
          <Button
            variant="contained"
            type="button"
            size="large"
            onClick={submitLogin}
          >
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
