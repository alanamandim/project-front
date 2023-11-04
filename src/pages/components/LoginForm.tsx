import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import Grid from "@mui/material/Grid";
import { Button, FormLabel, TextField, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [senha, setsenha] = useState<string>("");
  const { setUser } = useContext(AuthContext);

  const goToRegister = () => {
    navigate("/register");
  };

  const url = "http://localhost:8080/";

  // async function getEmail() {
  //   try {
  //     const response = await fetch(url + "email/" + email, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.ok) {
  //       // A solicitação foi bem-sucedida (código de status 2xx)
  //       const data = await response.json();
  //       console.log(data);

  //       setUser(data);
  //       localStorage.clear();
  //       const userJSON = JSON.stringify(data);
  //       getUser(userJSON);
  //       // window.localStorage.setItem("user", userJSON);

  //       window.location.href = "/dashboard";
  //     } else {
  //       // A solicitação falhou (código de status não 2xx)
  //       console.error("Falha no login:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Erro ao fazer a solicitação:", error);
  //   }
  // }

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

  // async function submitLogin() {
  //   const formData = { email, senha };
  //
  // Exemplo de como enviar o arquivo para o back-end usando fetch API.
  //   await fetch(url + "loginUsuario", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(formData),
  //   })
  //     .then((response: any) => {
  //       if (response.status === 200) {
  //         toast.success(`Login efetuado com sucesso!`, {
  //           position: "top-right",
  //           autoClose: 4000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //         });

  //         const data = response.json();
  //         console.log("loginusuario", data);
  //         setUser(data);
  //         window.location.href = "/dashboard";

  //         // getUser(data.email);
  //       } else if (response.status === 401) {
  //         // Invalid ID
  //         toast.error("Ops! Login ou senha incorreto.");
  //       } else {
  //         toast.error("Ops! Login ou senha incorreto.");
  //         console.log(response.status);
  //         console.log(response);
  //       }
  //     })
  //     .catch((error) => {
  //       // Os erros, se houver.
  //       console.log(error);
  //       toast.error(`Ops! Algo inesperado aconteceu`, {
  //         position: "top-right",
  //         autoClose: 4000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //     });
  // }

  async function submitLogin() {
    const url = "http://localhost:8080/loginUsuario"; // Substitua pela URL do seu endpoint
    const formData = { email, senha };

    const opcoes = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    try {
      const resposta = await fetch(url, opcoes);

      if (!resposta.ok) {
        throw new Error(`Erro na solicitação: ${resposta.status}`);
      }

      const dados = await resposta.json();
      console.log("Resposta do servidor:", dados);
      toast.success(`Login efetuado com sucesso!`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setUser(dados);

      //window.location.href = "/dashboard";
    } catch (erro) {
      console.log(erro);
      toast.error(`Ops! Algo inesperado aconteceu`, {
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
