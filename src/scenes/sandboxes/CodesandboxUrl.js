import { Button, Grid, Link } from "@mui/material";

import { getParameters } from "codesandbox/lib/api/define";

export default function CodesandboxUrl() {
  const parameters = getParameters({
    files: {
      "index.js": {
        content: "console.log('hello')",
      },
      //   "ChatGPT.js": {
      //     content: "console.log('hello')",
      //   },
      "package.json": {
        content: { dependencies: {} },
      },
    },
  });

  const url = `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`;

  return (
    <Grid container>
      <Grid item xs={4} />
      <Grid item xs={4} mt={"30vh"}>
        <Button
          variant="contained"
          sx={{
            height: "20vh",
            width: "40vh",
            textTransform: "none",
            background: "linear-gradient(to left, #fff7d0, #FFD710)", // Replace with your gradient colors
            transition: "opacity 0.3s",

            "&:hover": {
              opacity: 0.7, // Change this value to control the fade-out effect
            },
          }}>
          <Link
            href={url}
            target="_blank"
            variant="caption"
            rel="noopener noreferrer"
            sx={{
              fontSize: 30,
              textDecoration: "none",
            }}>
            Codesandbox Link
          </Link>
        </Button>
      </Grid>
      <Grid item xs={4} />
    </Grid>
  );
}
