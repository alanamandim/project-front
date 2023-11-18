import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import Relatorio from "./components/Relatorio";

const Sender = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user.chefe === true ? (
        <Grid
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
        >
          <Relatorio />
        </Grid>
      ) : (
        toast.error("Ops! Algo deu errado, saia e entre novamente!")
      )}
    </>
  );
};

export default Sender;