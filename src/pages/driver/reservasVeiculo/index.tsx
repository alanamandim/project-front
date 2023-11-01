import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Grid, Typography } from "@mui/material";
import ReservasForm from "./components/ReservasVeiculo";
import { toast } from "react-toastify";

const ReservasVeiculoForm = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {/* {user.motorista === true ? ( */}
      <Grid
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Typography variant="h3" mt={3} mb={3} alignItems="center">
          Reservation List
        </Typography>
        <ReservasForm />
      </Grid>
      {/* ) : (
        toast.error("Ops! Você não está autenticado como motorista, faça o login!")
      )} */}
    </>
  );
};

export default ReservasVeiculoForm;
