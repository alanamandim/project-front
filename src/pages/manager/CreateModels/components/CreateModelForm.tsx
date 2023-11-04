import { Button, FormLabel, Grid, TextField } from "@mui/material";

// Rota: /adicionaModelo ((TODOS OS USESTATES TEM QUE ESTAR EM PORTUGUES EXATAMENTE COMO ESTÃO OS NAMES DOS INPUTS))

const FormCreateModel = () => {
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
        <Grid item mb={3}>
          <FormLabel htmlFor="marca">Marca</FormLabel>
          <TextField id="marca" name="marca" fullWidth />
        </Grid>
        <Grid item mb={3}>
          <FormLabel htmlFor="modelo">Modelo</FormLabel>
          <TextField id="modelo" name="modelo" fullWidth />
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

export default FormCreateModel;
