import { useContext, useState } from "react";
import FormLabel from "@mui/material/FormLabel";
import { AuthContext, IRegisterUser } from '../../../context/AuthContext'

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
  const [password, setPassword] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [saram, setSaram] = useState<string>("");
  const userContext = useContext(AuthContext)

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
    if (password === checkPassword) {
      // FIXME: Change it when syncing with the database
      const newUserData: IRegisterUser = {
        email: email,
        name: name,
        saram: saram,
        password: password,
      };

      // await api.post("/registerUser", newUserData);
      userContext.registerUser({
        name: newUserData.name,
        email: newUserData.email,
        password: newUserData.password,
        saram: newUserData.saram,
        photo: '',
      });

      toast.success(`You're registered, now please log in!`, {
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
        window.location.href = '/'
      };

      TimeSleep();
    } else {
      toast.error(`Oops! The passwords do not match!`, {
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
            <FormLabel htmlFor="name">Foto (Envie uma foto se for motorista e se enviou o formulário abaixo!)</FormLabel>
            <ImageUploader id={saram} />
          </Grid>
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
    </>

  );
};

export default RegisterForm;
