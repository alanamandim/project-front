import { Button, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user);

  return (
    <>
      {user ? (
        <Grid
          display="flex"
          flexDirection="column"
          alignItems="center"
          minHeight="80vh"
        >
          <Typography variant="h3" mt={3} alignItems="center">
            Dashboard
          </Typography>
          <Grid display="flex" mt={3} flexDirection="column">
            <Grid item mb={3}>
              <Button
                style={{ width: "200px" }}
                variant="contained"
                size="large"
                type="button"
                onClick={() => {
                  navigate("/driver");
                }}
              >
                Motorista
              </Button>
            </Grid>
            <Grid item mb={3}>
              <Button
                style={{ width: "200px" }}
                variant="contained"
                size="large"
                type="button"
                onClick={() => {
                  navigate("/manager");
                }}
              >
                Gestor
              </Button>
            </Grid>
            <Grid item mb={3}>
              <Button
                style={{ width: "200px" }}
                variant="contained"
                size="large"
                type="button"
                onClick={() => {
                  navigate("/approver");
                }}
              >
                Aprovador
              </Button>
            </Grid>
            <Grid item mb={3}>
              <Button
                style={{ width: "200px" }}
                variant="contained"
                size="large"
                type="button"
                onClick={() => {
                  navigate("/sender");
                }}
              >
                Chefe
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Dashboard;
