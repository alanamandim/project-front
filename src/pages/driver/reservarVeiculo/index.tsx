import { useContext } from "react";
import Grid from "@mui/material/Grid";
import { Button, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import ReservaForm from "./components/ReservaForm";


const Reserve = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      {
        user.motorista == true ? (
            <Grid
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              minHeight="80vh"
            >
              <Typography variant="h3" mt={3} mb={3} alignItems="center">
                Reserve Page
              </Typography>
              <Typography variant="h4" mt={3} alignItems="center">
                Preencha o formulário e faca seu pedido de reserva:
              </Typography>
              <ReservaForm/>
            </Grid>  
        ) : (
          <Navigate to="/" />
        )
      }
    </>
  )
};

export default Reserve;
