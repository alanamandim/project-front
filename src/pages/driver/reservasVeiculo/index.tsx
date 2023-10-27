import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import ReservasForm from "./components/ReservasVeiculo";

const ReservasVeiculoForm = () => {
  const { user } = useContext(AuthContext);
  const userLocal: any = localStorage.getItem("user");

  return (
    <>
      {user.motorista == true || userLocal.motorista == true ? (
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
          {/* <ReservasForm /> */}
        </Grid>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default ReservasVeiculoForm;
