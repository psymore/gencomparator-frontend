import { Button, Grid, Typography } from "@mui/material";

export default function Evaluation() {
  const llmList = ["ChatGPT", "Gemini", "AlephAlpha"];
  return (
    <Grid container spacing={0}>
      {llmList.map((llm, ix) => (
        <Grid
          item
          xs={12}
          key={ix}
          sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
          <Button
            sx={{
              backgroundColor: "#ffbd8f",
              minWidth: 200,
            }}>
            <Typography sx={{ fontSize: 26, color: "black" }}>{llm}</Typography>
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}
