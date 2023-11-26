import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { toast } from "react-toastify";

function ListUsersCard() {
  const [dataGet, setDataGet] = useState([{}]);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }

  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  async function getInfo() {
    const response = await fetch("http://localhost:8080/usuariosPendentes", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      toast.success("Lista criada com sucesso!");
      setDataGet(data);
    } else {
      toast.error("Lista não criada, entre novamente mais tarde!");
    }
  }

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <ul>
      {dataGet.map((item: any) => (
        <Card sx={{ maxWidth: 345, marginBottom: 10 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                U
              </Avatar>
            }
            title={item.nome}
            subheader={item.saram}
          />
          <CardMedia
            component="img"
            height="194"
            image="https://s2.glbimg.com/jsaPuF7nO23vRxQkuJ_V3WgouKA=/e.glbimg.com/og/ed/f/original/2014/06/10/461777879.jpg"
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {`Email: ${item.email}`}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <CardActions
                sx={{ overflow: "hidden" }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Button
                  onClick={() => {
                    localStorage.setItem("userPUT", JSON.stringify(item));
                    setExpanded(false);
                    window.location.href = "/manager/list-users/ficha";
                  }}
                >
                  Abrir Formulário
                </Button>
              </CardActions>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </ul>
  );
}

export default ListUsersCard;
