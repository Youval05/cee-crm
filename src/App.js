import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import VisitForm from './components/VisitForm';
import VisitsBoard from './pages/VisitsBoard';
import Reports from './pages/Reports';
import CeeCalculator from './components/CeeCalculator';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
      contrastText: '#fff',
    },
    secondary: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    success: {
      main: '#00ca72',
      dark: '#00a65d',
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: '#1a237e',
      marginBottom: '1rem',
    },
    h5: {
      fontWeight: 500,
      color: '#1a237e',
    },
    h6: {
      fontWeight: 500,
      color: '#1976d2',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 24px',
        },
        contained: {
          boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .1)',
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(224, 224, 224, 0.4)',
        },
        head: {
          fontWeight: 600,
          backgroundColor: '#f5f6f8',
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        }
      }
    }
  }
});

const routes = [
  { path: '/', element: <Dashboard /> },
  { path: '/visites', element: <VisitsBoard /> },
  { path: '/nouvelle-visite', element: <VisitForm /> },
  { path: '/visite/:id', element: <VisitForm mode="view" /> },
  { path: '/visite/:id/edit', element: <VisitForm mode="edit" /> },
  { path: '/rapports', element: <Reports /> },
  { path: '/calculateur-cee', element: <CeeCalculator /> },
];

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
          <Navigation />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              pt: { xs: 10, sm: 11 },
              overflow: 'auto',
            }}
          >
            <Routes>
              {routes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
