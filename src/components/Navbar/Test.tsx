import { Grid, Box } from '@mui/material';

const Test = () => (
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <Box>Left</Box>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Box>Right</Box>
    </Grid>
  </Grid>
);

export default Test;