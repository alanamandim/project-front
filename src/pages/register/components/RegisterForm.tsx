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
  email: string;
  name: string;
  saram: string;
  password: string;
  confirm_password: string;
}

const RegisterForm = () => {
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const errorRequired = "Campo obrigatório";
  const min2CharError = "Minimo 2 caracteres";

  const schemaUsers = yup.object({
    email: yup
      .string()
      .email()
      .min(3, min2CharError)
      .required(errorRequired),
    name: yup.string().required(errorRequired),
    saram: yup.string().required(errorRequired),
    password: yup.string().required(errorRequired),
    confirm_password: yup.string().required(errorRequired),
  });

  const initialValues: FormValues = {
    email: "",
    name: "",
    saram: "",
    password: "",
    confirm_password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schemaUsers,
    onSubmit: (values) => {
      const newUserData = {
        email: values.email,
        name: values.name,
        saram: values.saram,
        password: values.password,
      };

      console.log(newUserData);
      console.log("newUserData");
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
          <FormLabel htmlFor="name">Nome de Guerra</FormLabel>
          <TextField
            id="name"
            name="name"
            fullWidth
            value={values.name}
            onChange={handleChange}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
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
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            id="email"
            name="email"
            fullWidth
            value={values.email}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
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
