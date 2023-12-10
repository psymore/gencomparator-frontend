import { Autocomplete, Grid, TextField } from "@mui/material";

export default function CustomizedAutocomplete() {
  const credentials = [Username, Email];

  return (
    <Grid item xs={12}>
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
            size="small"
            variant="outlined"
            label="filterSelectedOptions"
            placeholder="Favorites"
          />
        )}
      />
    </Grid>
  );
}
