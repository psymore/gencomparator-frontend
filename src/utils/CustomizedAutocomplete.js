import { Autocomplete, Grid, TextField } from "@mui/material";

export default function CustomizedAutocomplete({ title, placeholder, mt }) {
  const credentials = ["Username", "Email", "Password", "Password Again"];

  return (
    <Grid item xs={12} mt={mt}>
      <Autocomplete
        freeSolo
        multiple
        id="tags-outlined"
        options={credentials}
        // getOptionLabel={option => option.title}
        // defaultValue={credentials}
        filterSelectedOptions
        renderInput={params => (
          <TextField
            {...params}
            // size="small"
            variant="outlined"
            label={title}
            placeholder={placeholder}
          />
        )}
      />
    </Grid>
  );
}
