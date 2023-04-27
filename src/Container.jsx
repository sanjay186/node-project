import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function SimpleContainer(props) {
    const {data} = props
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed >
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
        <code>{data}</code>
        </Box>

      </Container>
    </React.Fragment>
  );
}