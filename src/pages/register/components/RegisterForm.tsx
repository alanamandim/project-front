import React, { ChangeEvent, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import FormLabel from "@mui/material/FormLabel";

import {
  Autocomplete,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

interface FormValues {
  user_email: string;
  user_name: string;
  saram: string;
  user_type: string;
  password: string;
  confirm_password: string;
}

const RegisterForm = () => {
  const [type, setType] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const errorRequired = "Campo obrigatório";
  const min2CharError = "Minimo 2 caracteres";

  const schemaUsers = yup.object({
    user_email: yup
      .string()
      .email()
      .min(3, min2CharError)
      .required(errorRequired),
    user_name: yup.string().required(errorRequired),
    saram: yup.string().required(errorRequired),
    password: yup.string().required(errorRequired),
    confirm_password: yup.string().required(errorRequired),
  });

  const categories = ["Motorista", "Gestor", "Identificador", "Aprovador"];

  const initialValues: FormValues = {
    user_email: "",
    user_name: "",
    saram: "",
    user_type: type,
    password: "",
    confirm_password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schemaUsers,
    onSubmit: (values) => {
      const newUserData = {
        user_email: values.user_email,
        user_name: values.user_name,
        saram: values.saram,
        user_type: values.user_type,
        password: values.password,
      };

      console.log(newUserData);
      formik.resetForm();
    },
  });

  const { values, touched, errors, handleChange } = formik;

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        item
        container
        columnSpacing={2}
        mt={2}
        direction="column"
        justifyContent="center"
      >
        <Grid item mb={3}>
          <FormLabel htmlFor="user_name">Nome de Guerra</FormLabel>
          <TextField
            id="user_name"
            name="user_name"
            fullWidth
            value={values.user_name}
            onChange={handleChange}
            error={touched.user_name && Boolean(errors.user_name)}
            helperText={touched.user_name && errors.user_name}
          />
        </Grid>
        <Grid item mb={3}>
          <FormLabel htmlFor="saram">SARAM</FormLabel>
          <TextField
            id="saram"
            name="saram"
            fullWidth
            value={values.saram}
            onChange={handleChange}
            error={touched.saram && Boolean(errors.saram)}
            helperText={touched.saram && errors.saram}
          />
        </Grid>
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
            id="text-confirm-password"
            name="confirm_password"
            value={password}
            onChange={handlePassword}
            fullWidth
          />
        </Grid>
        <Grid item mb={3}>
          <FormLabel htmlFor="confirm_password">Confirmar Senha</FormLabel>
          <TextField
            id="confirm_password"
            name="confirm_password"
            fullWidth
            value={values.confirm_password}
            onChange={handleChange}
            error={touched.confirm_password && Boolean(errors.confirm_password)}
            helperText={touched.confirm_password && errors.confirm_password}
          />
        </Grid>
        <Grid item mb={3} alignItems="center">
          <Button variant="contained" size="large" type="submit">
            CADASTRAR
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default RegisterForm;
