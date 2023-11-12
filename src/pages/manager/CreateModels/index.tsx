import { Grid, Typography } from "@mui/material";
import FormCreateModel from "./components/CreateModelForm";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const CreateCarModel = () => {
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
            Preencha o formulário e cadastre a marca:
          </Typography>
          <FormCreateModel />
        </Grid>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default CreateCarModel;
