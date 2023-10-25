import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputLabel,
  Select,
  TextField,
} from "@mui/material";

const InspecaoForm = () => {
  return (
    <form>
      <Grid
        item
        container
        columnSpacing={2}
        mt={2}
        direction="column"
        justifyContent="center"
      >
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Óleo"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Pneu"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Água"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Amassado"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Arranhado"
          />
        </FormGroup>
        <Grid item mb={3}>
          <FormLabel htmlFor="tanque">Tanque</FormLabel>
          <TextField id="tanque" name="tanque" fullWidth />
        </Grid>
        <Grid item mb={3}>
          <FormLabel htmlFor="obs">OBS</FormLabel>
          <TextField id="obs" name="obs" fullWidth />
        </Grid>
        <Grid item mb={3}>
          <FormLabel htmlFor="idSolicitacao">Id da Solicitação</FormLabel>
          <TextField id="idSolicitacao" name="idSolicitacao" fullWidth />
        </Grid>
        <Grid item mb={3} alignItems="center">
          <Button variant="contained" size="large">
            ENVIAR
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default InspecaoForm;
