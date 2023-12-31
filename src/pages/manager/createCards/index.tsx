import { Grid, Typography } from "@mui/material";
import CreatedCard from "./components/CreateCardForm";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";

const CreateCar = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user.gestor === true ? (
        <Grid
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
        >
          <Typography variant="h3" mt={3} mb={3} alignItems="center">
            Create Car Page
          </Typography>
          <Typography variant="h4" mt={3} alignItems="center">
            Preencha o formulário e cadastre o seu veículo:
          </Typography>
          <CreatedCard />
        </Grid>
      ) : (
        toast.error("Ops! Algo deu errado, saia e entre novamente!")
      )}
    </>
  );
};

export default CreateCar;
