import * as yup from "yup";
import React from "react";
import { Grid } from "@mui/material";
import { useFormik } from "formik";

interface FormValues {
  user_email: string;
  senha: string;
}

const MissionForm = () => {
  const errorRequired = "Campo obrigatório";
  const min2CharError = "Minimo 2 caracteres";

  const schemaUsers = yup.object({
    user_email: yup
      .string()
      .email()
      .min(3, min2CharError)
      .required(errorRequired),
    senha: yup.string().required(errorRequired),
  });

  const initialValues: FormValues = {
    user_email: "",
    senha: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schemaUsers,
    onSubmit: (values) => {
      const newUserData = {
        user_email: values.user_email,
        user_senha: values.senha,
      };

      console.log(newUserData);
      formik.resetForm();
    },
  });
  const { values, touched, errors, handleChange } = formik;
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid></Grid>
    </form>
  );
};
export default MissionForm;
