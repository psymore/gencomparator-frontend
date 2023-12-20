import { Grid } from "@mui/material";

export default function Evaluation() {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        Palm
      </Grid>
      <Grid item xs={12}>
        Bard
      </Grid>
      <Grid item xs={12}>
        Cody
      </Grid>
      <Grid item xs={12}>
        ChatGPT
      </Grid>
    </Grid>
  );
}
