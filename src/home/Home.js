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
        <Typography mt={5}>This is gencomparator.</Typography>
        <Typography mt={6} mr={2}>
          You can choose and customize different prompt templates by clicking
          the button below.
        </Typography>
        <Button
          variant="outlined"
          sx={{ width: "350px", height: "90px", mt: 15 }}
          onClick={() => navigate(`/prompt-templates`)}>
          Prompt Templates
        </Button>
      </Grid>
      <Grid item xs={2}></Grid>
    </Grid>
  );
}
