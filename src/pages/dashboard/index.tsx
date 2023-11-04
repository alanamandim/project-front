import { Button, Grid, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtenha o objeto user do localStorage
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      // Parse o objeto do localStorage para um objeto JavaScript
      const parsedUser = JSON.parse(storedUser);

      // Defina o objeto user no estado
      setUser(parsedUser);
    }
  }, [setUser, user]);

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
            <Grid item mb={3}>
              <Button
                style={{ width: "200px" }}
                variant="contained"
                size="large"
                type="button"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
              >
                Deslogar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        toast.error("Ops! Algo deu errado, saia e entre novamente!")
      )}
    </>
  );
};

export default Dashboard;
