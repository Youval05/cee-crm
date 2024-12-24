import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Alert,
  Card,
  CardContent,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import CalculateIcon from '@mui/icons-material/Calculate';
import SaveIcon from '@mui/icons-material/Save';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const operationTypes = [
  {
    code: 'BAT-TH-102',
    name: 'Chaudière collective haute performance énergétique',
    unit: 'kW',
    forfait: 4.2,
  },
  {
    code: 'BAT-TH-113',
    name: 'Pompe à chaleur de type air/eau ou eau/eau',
    unit: 'kW',
    forfait: 5.8,
  },
  {
    code: 'BAT-TH-116',
    name: 'Système de gestion technique du bâtiment',
    unit: 'm²',
    forfait: 7.2,
  },
  {
    code: 'BAT-EN-101',
    name: 'Isolation de combles ou de toitures',
    unit: 'm²',
    forfait: 5.5,
  },
  {
    code: 'BAT-EN-102',
    name: 'Isolation des murs',
    unit: 'm²',
    forfait: 6.3,
  },
  {
    code: 'BAT-EN-103',
    name: 'Isolation d\'un plancher',
    unit: 'm²',
    forfait: 5.8,
  },
  {
    code: 'BAT-EQ-127',
    name: 'Luminaire LED',
    unit: 'W remplacés',
    forfait: 0.4,
  },
];

const CeeCalculator = () => {
  const [operations, setOperations] = useState([]);
  const [currentOperation, setCurrentOperation] = useState({
    type: '',
    quantity: '',
    zone: 'H1',
  });
  const [ceeRate, setCeeRate] = useState(8.5);
  const [showResults, setShowResults] = useState(false);

  const handleAddOperation = () => {
    if (currentOperation.type && currentOperation.quantity) {
      const selectedType = operationTypes.find(
        (op) => op.code === currentOperation.type
      );
      
      const newOperation = {
        ...currentOperation,
        name: selectedType.name,
        unit: selectedType.unit,
        forfait: selectedType.forfait,
        ceeAmount: calculateCEE(
          currentOperation.quantity,
          selectedType.forfait,
          currentOperation.zone
        ),
      };

      setOperations([...operations, newOperation]);
      setCurrentOperation({
        type: '',
        quantity: '',
        zone: 'H1',
      });
    }
  };

  const handleDeleteOperation = (index) => {
    setOperations(operations.filter((_, i) => i !== index));
  };

  const calculateCEE = (quantity, forfait, zone) => {
    const zoneMultiplier = {
      H1: 1.2,
      H2: 1,
      H3: 0.8,
    };
    return quantity * forfait * zoneMultiplier[zone] * 1000; // en kWh cumac
  };

  const getTotalCEE = () => {
    return operations.reduce((sum, op) => sum + op.ceeAmount, 0);
  };

  const getFinancialGain = () => {
    return getTotalCEE() * (ceeRate / 1000); // Conversion en euros
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Calculateur CEE
            </Typography>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  select
                  label="Type d'opération"
                  value={currentOperation.type}
                  onChange={(e) =>
                    setCurrentOperation({ ...currentOperation, type: e.target.value })
                  }
                >
                  {operationTypes.map((op) => (
                    <MenuItem key={op.code} value={op.code}>
                      {op.code} - {op.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  type="number"
                  label="Quantité"
                  value={currentOperation.quantity}
                  onChange={(e) =>
                    setCurrentOperation({ ...currentOperation, quantity: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  select
                  label="Zone climatique"
                  value={currentOperation.zone}
                  onChange={(e) =>
                    setCurrentOperation({ ...currentOperation, zone: e.target.value })
                  }
                >
                  <MenuItem value="H1">H1</MenuItem>
                  <MenuItem value="H2">H2</MenuItem>
                  <MenuItem value="H3">H3</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleAddOperation}
                  disabled={!currentOperation.type || !currentOperation.quantity}
                  sx={{ height: '100%' }}
                >
                  Ajouter
                </Button>
              </Grid>
            </Grid>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Code</TableCell>
                    <TableCell>Opération</TableCell>
                    <TableCell align="right">Quantité</TableCell>
                    <TableCell align="right">Zone</TableCell>
                    <TableCell align="right">kWh cumac</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {operations.map((op, index) => (
                    <TableRow key={index}>
                      <TableCell>{op.type}</TableCell>
                      <TableCell>{op.name}</TableCell>
                      <TableCell align="right">
                        {op.quantity} {op.unit}
                      </TableCell>
                      <TableCell align="right">{op.zone}</TableCell>
                      <TableCell align="right">
                        {op.ceeAmount.toLocaleString()}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteOperation(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {operations.length > 0 && (
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <TextField
                  label="Prix du kWh cumac (€)"
                  type="number"
                  value={ceeRate}
                  onChange={(e) => setCeeRate(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <Tooltip title="Prix moyen constaté sur le marché">
                        <InfoIcon color="action" sx={{ mr: 1 }} />
                      </Tooltip>
                    ),
                  }}
                  sx={{ width: 200 }}
                />
                <Button
                  variant="contained"
                  startIcon={<CalculateIcon />}
                  onClick={handleCalculate}
                >
                  Calculer
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          {showResults && (
            <Box>
              <Card sx={{ mb: 2, bgcolor: 'primary.main', color: 'white' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Total kWh cumac
                  </Typography>
                  <Typography variant="h4">
                    {getTotalCEE().toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ mb: 2, bgcolor: 'success.main', color: 'white' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Gain financier estimé
                  </Typography>
                  <Typography variant="h4">
                    {getFinancialGain().toLocaleString()} €
                  </Typography>
                </CardContent>
              </Card>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<SaveIcon />}
                  sx={{ bgcolor: '#00ca72', '&:hover': { bgcolor: '#00a65d' } }}
                >
                  Enregistrer
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<PictureAsPdfIcon />}
                  sx={{ bgcolor: '#ff5722', '&:hover': { bgcolor: '#f4511e' } }}
                >
                  Export PDF
                </Button>
              </Box>

              <Alert severity="info" sx={{ mt: 2 }}>
                Ces calculs sont donnés à titre indicatif et peuvent varier selon les
                conditions réelles du projet.
              </Alert>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CeeCalculator;
