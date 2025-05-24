// src/App.js
import React from 'react';
import { Button, Container, Typography } from '@mui/material';

function App() {
  return (
    <Container className="bg-gray-100 min-h-screen p-6">
      <Typography variant="h4" gutterBottom>
        Vehicle Rent App
      </Typography>
      <Button variant="contained" color="primary">
        Material UI Button
      </Button>
    </Container>
  );
}

export default App;
