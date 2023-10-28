import { useContext } from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import SolicitacaoForm from "./components/SolicitacaoForm";

const Request = () => {
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
            Request Page
          </Typography>
          <Typography variant="h4" mt={3} alignItems="center">
            Preencha o formulário para solicitar um veículo:
          </Typography>
          <SolicitacaoForm />
        </Grid>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Request;
