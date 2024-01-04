import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logoutAsync } from "../../services/userService";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2} mt={5}>
      <Grid item xs={12} sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <Button
          sx={{
            fontSize: 20,
            fontWeight: "bold",
            color: "white",
            mr: 5,
            width: 200,
            mb: 2,
          }}
          onClick={logoutAsync}>
          Logout
        </Button>
      </Grid>
      <Grid item xs={2}></Grid>

      <Grid
        item
        xs={8}
        sx={{
          height: "80vh",
          width: "60vw",
          backgroundColor: "#3a4754",
          borderRadius: "4rem",
        }}>
        <Typography sx={{ fontSize: "2rem", mt: 5, color: "white" }}>
          This is gencomparator.
        </Typography>
        <Grid item xs={12} sx={{ ml: "6%", mt: 7, mr: 2, alignItems: "left" }}>
          <Typography
            sx={{
              fontSize: "1.6rem",
              color: "white",
              textAlign: "justify",
              display: "flex",
            }}>
            * First, set your API keys for different LLMs.
          </Typography>
          <Typography
            sx={{
              fontSize: "1.6rem",
              mt: 5,
              color: "white",
              textAlign: "justify",
              display: "flex",
            }}>
            * Then, choose different prompt templates and customize them.
          </Typography>
          <Typography
            sx={{
              fontSize: "1.6rem",
              mt: 5,
              textAlign: "justify",
              color: "white",
              display: "flex",
            }}>
            * Last step is to get responses and LLM evaluation.
          </Typography>
        </Grid>

        <Grid item>
          <Button
            variant="outlined"
            sx={{
              width: "350px",
              height: "60px",
              mt: "8%",
            }}
            onClick={() => navigate(`/prompt-templates`)}>
            Continue to Prompt Templates
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
}
