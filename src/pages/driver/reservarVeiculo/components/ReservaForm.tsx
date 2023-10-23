import * as yup from "yup";
import { useFormik } from "formik";
import FormLabel from "@mui/material/FormLabel";

import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

interface FormValues {
  motivo: string;
  viatura: string;
  motorista: string;
}

const ReservaForm = () => {
  const errorRequired = "Campo obrigatório";

  const schemaSolicitacao = yup.object({
    motivo: yup.string().required(errorRequired),
    viatura: yup.string().required(errorRequired),
    motorista: yup.string().required(errorRequired),
  });

  const initialValues: FormValues = {
    motivo: "",
    viatura: "",
    motorista: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schemaSolicitacao,
    onSubmit: (values) => {
      const newUserData = {
        motivo: values.motivo,
        viatura: values.viatura,
        motorista: values.motorista,
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
            <MenuItem value={"12"}>Ten</MenuItem>
            <MenuItem value={"13"}>Twenty</MenuItem>
            <MenuItem value={"14"}>Thirty</MenuItem>
          </Select>
        </Grid>
        <Grid item mb={3}>
          <FormLabel htmlFor="motorista">Motorista</FormLabel>
          <TextField
            id="motorista"
            name="motorista"
            fullWidth
            value={values.motorista}
            onChange={handleChange}
            error={touched.motorista && Boolean(errors.motorista)}
            helperText={touched.motorista && errors.motorista}
          />
        </Grid>
        <Grid item mb={3} alignItems="center">
          <Button variant="contained" size="large" type="submit">
            RESERVAR
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ReservaForm;
