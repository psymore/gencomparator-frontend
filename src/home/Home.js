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
          height: "60vh",
          width: "30vw",
          backgroundColor: "#282c34",
          borderRadius: "4rem",
        }}>
        <Typography sx={{ fontSize: "2rem", mt: 5, color: "white" }}>
          This is gencomparator.
        </Typography>
        <Typography sx={{ fontSize: "1.6rem", mt: 12, mr: 2, color: "white" }}>
          You can choose different prompt templates and customize them by
          clicking the button below.
        </Typography>
        <Button
          variant="outlined"
          sx={{ width: "350px", height: "90px", mt: 13 }}
          onClick={() => navigate(`/prompt-templates`)}>
          Prompt Templates
        </Button>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
}
