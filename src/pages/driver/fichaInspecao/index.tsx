import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Navigate } from "react-router-dom";
import InspecaoForm from "./components/FormInspecao";
import { toast } from "react-toastify";

const Inspecao = () => {
  const { user } = useContext(AuthContext);
  const userLocal: any = localStorage.getItem("user");

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
            Inspeção Page
          </Typography>
          <Typography variant="h4" mt={3} alignItems="center">
            Preencha o formulário e faça o envio:
          </Typography>
          <InspecaoForm />
        </Grid>
      ) : (
        toast.error("Ops! Algo deu errado, saia e entre novamente!")
      )}
    </>
  );
};

export default Inspecao;
