import { useContext } from "react";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// no solicitar, aparecer apenas veículos disponíveis

const Driver = () => {
  const { user } = useContext(AuthContext);
  const userLocal: any = localStorage.getItem("user");
  const navigate = useNavigate();

  return (
    <>
      {user.motorista == true ? (
        <Grid
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
        >
          <Typography variant="h3" mt={3} mb={3} alignItems="center">
            Driver Page
          </Typography>
          <Typography variant="h4" mt={3} alignItems="center">
            Selecione a opção desejada:
          </Typography>
          <Grid display="flex" mt={3} flexDirection="column">
            <Grid item mb={3}>
              <Button
                style={{ width: "210px" }}
                variant="contained"
                size="large"
                type="button"
                onClick={() => {
                  navigate("/driver/reservar-veiculo");
                }}
              >
                Reservar Veículo
              </Button>
            </Grid>
            <Grid item mb={3}>
              <Button
                style={{ width: "210px" }}
                variant="contained"
                size="large"
                type="button"
                onClick={() => {
                  navigate("/driver/solicitar-veiculo");
                }}
              >
                Solicitar Veículo
              </Button>
            </Grid>
            <Grid item mb={3}>
              <Button
                style={{ width: "210px" }}
                variant="contained"
                size="large"
                type="button"
                onClick={() => {
                  navigate("/driver/inspecao-veiculo");
                }}
              >
                Ficha de Inspeção
              </Button>
            </Grid>
            <Grid item mb={3}>
              <Button
                style={{ width: "210px" }}
                variant="contained"
                size="large"
                type="button"
                onClick={() => {
                  navigate("/driver/reservas-veiculo");
                }}
              >
                Visualizar Pedidos
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        toast.error("Ops! Algo deu errado, saia e entre novamente!")
      )}
    </>
  );
};

export default Driver;
