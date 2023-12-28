import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const HomeButton = ({ mt, nav, ix }) => {
    return (
      <Grid item key={ix} xs={12} sx={{ mt: mt }}>
        <Button
          variant="outlined"
          sx={{ width: "250px", height: "60px" }}
          onClick={() => navigate(`/${nav}`)}>
          {nav}
        </Button>
      </Grid>
    );
  };

  const buttonList = [
    "palm",
    "cody-message",
    "chatGPT",
    "login-register",
    // "codesandbox",
    // "codesandbox-url",
  ];

  return (
    <Grid container spacing={2} mt={15}>
      {buttonList.map((button, ix) => (
        <HomeButton
          key={ix}
          nav={button}
          mt={button === "login-register" ? 10 : 1}
        />
      ))}
    </Grid>
  );
}
