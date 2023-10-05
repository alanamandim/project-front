import React, { ChangeEvent, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";

import Grid from "@mui/material/Grid";
import {
  Button,
  FormLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface FormValues {
  user_email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/register");
  };
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const errorRequired = "Campo obrigatório";
  const min2CharError = "Minimo 2 caracteres";

  const schemaUsers = yup.object({
    user_email: yup
      .string()
      .email()
      .min(3, min2CharError)
      .required(errorRequired),
    password: yup.string().required(errorRequired),
  }); //restrições do objeto (email e senha)

  const initialValues: FormValues = {
    user_email: "",
    password: "",
  }; //Montagem do objeto (email e senha)

  const formik = useFormik({
    initialValues,
    validationSchema: schemaUsers,
    onSubmit: (values) => {
      const newUserData = {
        user_email: values.user_email,
        user_password: values.password,
      };

      console.log(newUserData);
      formik.resetForm();
    },
  }); //envio dos dados para a o content (ssrc/content/AuthContext)

  const { values, touched, errors, handleChange } = formik;
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        columnSpacing={2}
        mt={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item mb={3}>
          <FormLabel htmlFor="user_email">Email</FormLabel>
          <TextField
            id="user_email"
            name="user_email"
            fullWidth
            value={values.user_email}
            onChange={handleChange}
            error={touched.user_email && Boolean(errors.user_email)}
            helperText={touched.user_email && errors.user_email}
          />
        </Grid>
        <Grid item mb={3} display="flex" flexDirection="column">
          <FormLabel htmlFor="password">Senha</FormLabel>
          {/* <TextField
            id="password"
            name="password"
            fullWidth
            value={values.password}
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          /> */}
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </Grid>
        <Grid item mb={3}>
          <Button variant="contained" size="large" type="submit">
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
