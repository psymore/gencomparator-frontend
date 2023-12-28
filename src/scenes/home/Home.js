import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2} mt={15}>
      <Grid item xs={2}></Grid>

      <Grid
        item
        xs={8}
        sx={{
          height: "80vh",
          width: "60vw",
          backgroundColor: "#282c34",
          borderRadius: "4rem",
        }}>
        <Typography sx={{ fontSize: "2rem", mt: 5, color: "white" }}>
          This is gencomparator.
        </Typography>
        <Typography
          sx={{
            fontSize: "1.6rem",
            ml: "2%",
            mt: 12,
            mr: 2,
            color: "white",
            alignItems: "left",
            display: "flex",
          }}>
          * First set your API keys for different LLMs that you want to get
          response and their evaluation.
        </Typography>
        <Typography
          sx={{
            fontSize: "1.6rem",
            ml: "2%",
            mt: 5,
            mr: 2,
            color: "white",
            display: "flex",
          }}>
          * Then choose different prompt templates and customize them by
          clicking the button below.
        </Typography>
        <Grid item>
          <Button
            variant="outlined"
            sx={{
              width: "350px",
              height: "60px",
              mt: 13,
            }}
            onClick={() => navigate("/set-keys")}>
            Set API Keys
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            sx={{
              width: "350px",
              height: "60px",
              mt: "2%",
            }}
            onClick={() => navigate(`/prompt-templates`)}>
            Continue Without API Keys
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
}
