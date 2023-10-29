import React, { useContext } from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Sender = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user.chefe == true ? (
        <Grid
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
        >
          <Typography variant="h3" mt={3} mb={3} alignItems="center">
            Sender Page
          </Typography>
          {/* <RegisterForm /> */}
        </Grid>
      ) : (
        toast.error("Ops! Algo deu errado, saia e entre novamente!")
      )}
    </>
  );
};

export default Sender;
