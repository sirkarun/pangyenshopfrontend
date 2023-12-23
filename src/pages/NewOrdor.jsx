import React from 'react'
import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Container, Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function NewOrdor() {
  return (
    <Container>
    <Typography variant="h4" gutterBottom>
      8 Boxes with MUI
    </Typography>
    <Grid container spacing={2}>
      {[...Array(8).keys()].map((index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper>
            <Box p={2}>
              <Typography variant="h6" gutterBottom>
                Box {index + 1}
              </Typography>
              <Typography>
                This is the content of Box {index + 1}. You can customize it as needed.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Container>
  )
}

export default NewOrdor