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
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";

interface FormValues {
  motivo: string;
  destino: string;
  viatura: string;
  saram: string;
}

const SolicitacaoForm = () => {

  const errorRequired = "Campo obrigatório";

  const schemaSolicitacao = yup.object({
    motivo: yup.string().required(errorRequired),
    destino: yup.string().required(errorRequired),
    viatura: yup.string().required(errorRequired),
    saram: yup.string().required(errorRequired),
  });

  const initialValues: FormValues = {
    motivo: "",
    destino: "",
    viatura: "",
    saram: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schemaSolicitacao,
    onSubmit: (values) => {
      const newUserData = {
        motivo: values.motivo,
        destino: values.destino,
        viatura: values.viatura,
        saram: values.saram,
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
          <FormLabel htmlFor="motivo">Motivo</FormLabel>
          <TextField
            id="motivo"
            name="motivo"
            fullWidth
            value={values.motivo}
            onChange={handleChange}
            error={touched.motivo && Boolean(errors.motivo)}
            helperText={touched.motivo && errors.motivo}
          />
        </Grid>
        <Grid item mb={3}>
          <FormLabel htmlFor="destino">Destino</FormLabel>
          <TextField
            id="destino"
            name="destino"
            fullWidth
            value={values.destino}
            onChange={handleChange}
            error={touched.destino && Boolean(errors.destino)}
            helperText={touched.destino && errors.destino}
          />
        </Grid>
        <Grid item mb={3}>
          <InputLabel id="demo-select-small-label">Viatura</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            // value={viatura}
            label="viatura"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </Grid>
        <Grid item mb={3}>
          <FormLabel htmlFor="saram">Saram</FormLabel>
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
        <Grid item mb={3} alignItems="center">
          <Button variant="contained" size="large" type="submit">
            SOLICITAR
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SolicitacaoForm;