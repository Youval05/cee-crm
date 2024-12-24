import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddIcon from '@mui/icons-material/Add';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalculateIcon from '@mui/icons-material/Calculate';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 280;

const menuItems = [
  { path: '/', icon: <DashboardIcon />, text: 'Tableau de bord' },
  { path: '/visites', icon: <AssignmentIcon />, text: 'Visites' },
  { path: '/nouvelle-visite', icon: <AddIcon />, text: 'Nouvelle visite' },
  { path: '/rapports', icon: <BarChartIcon />, text: 'Rapports' },
  { path: '/calculateur-cee', icon: <CalculateIcon />, text: 'Calculateur CEE' },
];

const Navigation = () => {
  const location = useLocation();

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          bgcolor: 'background.paper',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />

          <IconButton size="large" color="default">
            <NotificationsIcon />
          </IconButton>
          <IconButton size="large" color="default">
            <SettingsIcon />
          </IconButton>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              ml: 2,
              bgcolor: 'primary.main',
            }}
          >
            AD
          </Avatar>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
            CEE Pro
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gestion des CEE Tertiaires
          </Typography>
        </Box>
        
        <Divider />
        
        <List sx={{ px: 2 }}>
          {menuItems.map((item) => (
            <ListItem
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                borderRadius: 2,
                mb: 1,
                bgcolor: location.pathname === item.path ? 'action.selected' : 'transparent',
                color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 600 : 400,
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navigation;
