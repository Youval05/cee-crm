import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const barData = [
  { mois: 'Jan', visites: 65, eligible: 45 },
  { mois: 'Fév', visites: 75, eligible: 55 },
  { mois: 'Mar', visites: 85, eligible: 65 },
  { mois: 'Avr', visites: 95, eligible: 75 },
  { mois: 'Mai', visites: 80, eligible: 60 },
  { mois: 'Juin', visites: 90, eligible: 70 },
];

const pieData = [
  { name: 'Isolation murs', value: 35 },
  { name: 'Isolation combles', value: 25 },
  { name: 'Chauffage', value: 20 },
  { name: 'Ventilation', value: 15 },
  { name: 'Autres', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Reports = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
        Rapports et Statistiques
      </Typography>

      {/* KPIs */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          {
            title: 'Taux de conversion',
            value: '75%',
            subtext: '+5% vs mois dernier',
            color: '#0088FE'
          },
          {
            title: 'Montant moyen CEE',
            value: '4 500 €',
            subtext: '+800€ vs mois dernier',
            color: '#00C49F'
          },
          {
            title: 'Temps moyen/visite',
            value: '1h20',
            subtext: '-10min vs mois dernier',
            color: '#FFBB28'
          },
          {
            title: 'Satisfaction client',
            value: '4.8/5',
            subtext: '+0.2 vs mois dernier',
            color: '#FF8042'
          }
        ].map((kpi, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '8px',
                  height: '100%',
                  bgcolor: kpi.color,
                }
              }}
            >
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {kpi.title}
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                {kpi.value}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  mt: 'auto',
                  color: kpi.subtext.includes('+') ? 'success.main' : 'error.main'
                }}
              >
                {kpi.subtext}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Graphiques */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Évolution des visites
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mois" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="visites" fill="#8884d8" name="Total visites" />
                <Bar dataKey="eligible" fill="#82ca9d" name="Dossiers éligibles" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Répartition des travaux
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Tableau récapitulatif */}
      <Paper sx={{ mt: 4, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Performances par technicien
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Technicien</TableCell>
                <TableCell align="right">Visites réalisées</TableCell>
                <TableCell align="right">Taux de conversion</TableCell>
                <TableCell align="right">Temps moyen</TableCell>
                <TableCell>Performance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                {
                  name: 'Jean Martin',
                  visits: 45,
                  conversion: 80,
                  avgTime: '1h15',
                  performance: 95
                },
                {
                  name: 'Marie Dubois',
                  visits: 38,
                  conversion: 75,
                  avgTime: '1h20',
                  performance: 85
                },
                {
                  name: 'Pierre Durand',
                  visits: 42,
                  conversion: 70,
                  avgTime: '1h25',
                  performance: 80
                }
              ].map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.visits}</TableCell>
                  <TableCell align="right">{row.conversion}%</TableCell>
                  <TableCell align="right">{row.avgTime}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={row.performance}
                        sx={{
                          width: 100,
                          height: 8,
                          borderRadius: 5,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 5,
                            bgcolor: row.performance > 90 ? 'success.main' : 'primary.main',
                          }
                        }}
                      />
                      <Typography variant="body2">
                        {row.performance}%
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Actions */}
      <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button variant="outlined">
          Exporter les données
        </Button>
        <Button 
          variant="contained"
          sx={{
            bgcolor: '#00ca72',
            '&:hover': { bgcolor: '#00a65d' }
          }}
        >
          Générer rapport mensuel
        </Button>
      </Box>
    </Container>
  );
};

export default Reports;
