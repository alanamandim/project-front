import { useContext } from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { AuthContext } from "../../../context/AuthContext";
import ReservaForm from "./components/ReservaForm";
import { toast } from "react-toastify";

const Reserve = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user.motorista === true ? (
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
          <ReservaForm />
        </Grid>
      ) : (
        toast.error("Ops! Algo deu errado, saia e entre novamente!")
      )}
    </>
  );
};

export default Reserve;
