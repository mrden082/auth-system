'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    background: {
      default: '#e3f2fd',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          borderRadius: 4,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
              textTransform: 'none',
              minWidth: '150px',
              height: '40px',
              fontSize: '14px',
              display: 'flex',
              justifyContent: 'center'
        },
      },
    },
  },
});

export default theme;