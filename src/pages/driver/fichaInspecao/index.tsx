import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import InspecaoForm from "./components/FormInspecao";

const Inspecao = () => {
  const { user } = useContext(AuthContext);

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
