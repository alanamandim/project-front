import {
  Button,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

//criar a requisição: /adicionaViatura (TODOS OS USESTATES TEM QUE ESTAR EM PORTUGUES EXATAMENTE COMO ESTÃO OS NAMES DOS INPUTS)

const CreatedCard = () => {
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
          <FormLabel htmlFor="placa">Placa</FormLabel>
          <TextField id="placa" name="placa" fullWidth />
        </Grid>
        <Grid item mb={3}>
          <FormLabel htmlFor="chassi">Chassi</FormLabel>
          <TextField id="chassi" name="chassi" fullWidth />
        </Grid>
        <Grid item mb={3}>
          <FormLabel htmlFor="tipoCombustivel">Tipo de Combustível</FormLabel>
          <TextField id="tipoCombustivel" name="tipoCombustivel" fullWidth />
        </Grid>
        <Grid item mb={3}>
          {/* VALOR DO HODOMETRO DEVE SER TRANSFORMADO EM UM INTEIRO ANTES DE SER ENVIADO PRA API */}
          <FormLabel htmlFor="hodometro">Hodometro</FormLabel>
          <TextField id="hodometro" name="hodometro" fullWidth />
        </Grid>
        <Grid item mb={3}>
          {/* NESSE SELECT TEM QUE TER A ROTA GET PRA PEGAR TODOS OS MODELOS QUE JÁ FORAM CADASTRADOS */}
          <InputLabel id="demo-simple-select-label">Modelo</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={}
            label="modelo"
            // onChange={}
          >
            <MenuItem value={"valor"}>modelo</MenuItem>
            <MenuItem value={"valor"}>modelo</MenuItem>
            <MenuItem value={"valor"}>modelo</MenuItem>
          </Select>
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

export default CreatedCard;
