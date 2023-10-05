import * as yup from "yup";
import React from "react";
import { Grid } from "@mui/material";
import { useFormik } from "formik";

interface FormValues {
  checked: string[];
  tank_level: string;
  obs: string;
}

const InspForm = () => {
  const errorRequired = "Campo obrigatório";

  const schemaUsers = yup.object({
    checked: yup.string().required(errorRequired),
    tank_level: yup.string().required(errorRequired),
    obs: yup.string().required(errorRequired),
  });

  const initialValues: FormValues = {
    checked: [],
    tank_level: "cheio",
    obs: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schemaUsers,
    onSubmit: (values) => {
      const newUserData = {
        checked: values.checked,
        tank_level: values.tank_level,
        obs: values.obs,
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

export default InspForm;
