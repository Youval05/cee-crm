import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Divider,
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
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BusinessIcon from '@mui/icons-material/Business';
import EuroIcon from '@mui/icons-material/Euro';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';

// Données simulées pour le dashboard
const visitsByMonth = [
  { name: 'Jan', visites: 4 },
  { name: 'Fév', visites: 6 },
  { name: 'Mar', visites: 8 },
  { name: 'Avr', visites: 12 },
  { name: 'Mai', visites: 9 },
  { name: 'Juin', visites: 15 },
];

const projectTypes = [
  { name: 'Isolation', value: 35 },
  { name: 'Chauffage', value: 25 },
  { name: 'Éclairage', value: 20 },
  { name: 'Ventilation', value: 15 },
  { name: 'Autres', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const StatCard = ({ title, value, icon, color, subtitle }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            backgroundColor: `${color}15`,
            borderRadius: 2,
            p: 1,
            mr: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </Box>
      </Box>
      {subtitle && (
        <>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        </>
      )}
    </CardContent>
  </Card>
);

const Dashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Tableau de bord
      </Typography>

      <Grid container spacing={3}>
        {/* Statistiques principales */}
        <Grid item xs={12} md={3}>
          <StatCard
            title="Visites en cours"
            value="24"
            icon={<BusinessIcon sx={{ color: '#2196f3' }} />}
            color="#2196f3"
            subtitle="8 visites planifiées cette semaine"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="CEE générés"
            value="2.8 GWh cumac"
            icon={<EnergySavingsLeafIcon sx={{ color: '#4caf50' }} />}
            color="#4caf50"
            subtitle="+15% ce mois-ci"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Montant CEE"
            value="182 k€"
            icon={<EuroIcon sx={{ color: '#ff9800' }} />}
            color="#ff9800"
            subtitle="Valorisation à 6.5€/MWh cumac"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Taux de conversion"
            value="68%"
            icon={<TrendingUpIcon sx={{ color: '#f44336' }} />}
            color="#f44336"
            subtitle="12 projets signés sur 18"
          />
        </Grid>

        {/* Graphiques */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Évolution des visites
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={visitsByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="visites" fill="#2196f3" name="Nombre de visites" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Types de projets
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projectTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {projectTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Projets en cours */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Objectifs du trimestre
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Volume CEE</Typography>
                    <Typography variant="body2" color="primary">
                      2.8/4 GWh cumac
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={70}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Nombre de visites</Typography>
                    <Typography variant="body2" color="primary">
                      24/30
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={80}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Taux de transformation</Typography>
                    <Typography variant="body2" color="primary">
                      68/75%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={90}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
