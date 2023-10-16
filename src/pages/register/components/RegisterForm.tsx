import { useState } from "react";
import FormLabel from "@mui/material/FormLabel";
import { IRegisterUser } from '../../../context/AuthContext'

import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

const RegisterForm = () => {
  const [password, setPassword] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [saram, setSaram] = useState<string>("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  function collectDataFromForm() {
    const inputElementName = document.getElementById("name") as HTMLInputElement | null;
    if (inputElementName !== null) {
      const formName = inputElementName.value;
      setName(formName);
    }

    const inputElementEmail = document.getElementById("email") as HTMLInputElement | null;
    if (inputElementEmail !== null) {
      const formEmail = inputElementEmail.value;
      setEmail(formEmail);
    }

    const inputElementSaram = document.getElementById("saram") as HTMLInputElement | null;
    if (inputElementSaram !== null) {
      const formSaram = inputElementSaram.value;
      setSaram(formSaram);
    }

    const inputElementPassword = document.getElementById("password") as HTMLInputElement | null;
    if (inputElementPassword !== null) {
      const formPassword = inputElementPassword.value;
      setPassword(formPassword);
    }

    const inputElementCheckPassword = document.getElementById("check-password") as HTMLInputElement | null;
    if (inputElementCheckPassword !== null) {
      const formCheckPassword = inputElementCheckPassword.value;
      setCheckPassword(formCheckPassword);
    }
  }

  function getValuesFromForm() {
    if (password !== checkPassword) {
      alert("Senhas não conferem");
    } else {
      const newUserData: IRegisterUser = {
        email: email,
        name: name,
        saram: saram,
        password: password,
      };

      console.log('newUserData', newUserData);

      // Redirect after success!
      window.location.href = '/'
    }
  }


  return (
    <form onSubmit={(e) => e.preventDefault()} onChange={() => collectDataFromForm()} >
      <Grid
        item
        container
        columnSpacing={2}
        mt={2}
        direction="column"
        justifyContent="center"
      >
        <Grid item mb={3}>
          <FormLabel htmlFor="name">Nome de Guerra</FormLabel>
          <TextField
            id="name"
            name="name"
            fullWidth
            value={name}
          />
        </Grid>
        <Grid item mb={3}>
          <FormLabel htmlFor="saram">SARAM</FormLabel>
          <TextField
            id="saram"
            name="saram"
            fullWidth
            value={saram}
          />
        </Grid>
        <Grid item mb={3}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            id="email"
            name="email"
            fullWidth
            value={email}
          />
        </Grid>
        <Grid item mb={3}>
          <FormLabel htmlFor="password">Senha</FormLabel>
          <OutlinedInput
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <IconEye /> : <IconEyeOff />}
                </IconButton>
              </InputAdornment>
            }
            id="password"
            name="password"
            value={password}
            fullWidth
          />
        </Grid>
        <Grid item mb={3}>
          <FormLabel htmlFor="confirm_password">Confirmar Senha</FormLabel>
          <TextField
            id="check-password"
            name="check-password"
            fullWidth
            value={checkPassword}
          />
        </Grid>
        <Grid item mb={3} alignItems="center">
          <Button variant="contained" size="large" type="submit" onClick={getValuesFromForm}>
            CADASTRAR
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default RegisterForm;
