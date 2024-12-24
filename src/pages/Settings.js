import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Switch,
  FormControlLabel,
  Tabs,
  Tab,
  Divider,
  Avatar,
  IconButton,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const Settings = () => {
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    // Informations entreprise
    companyName: 'Ma Société CEE',
    siret: '123 456 789 00001',
    address: '123 rue de l\'Énergie',
    city: 'Paris',
    postalCode: '75001',
    phone: '01 23 45 67 89',
    email: 'contact@masociete.fr',
    website: 'www.masociete.fr',
    
    // Préférences notifications
    emailNotifications: true,
    visitReminders: true,
    reportNotifications: true,
    deadlineAlerts: true,
    
    // Préférences CEE
    defaultCEERate: '8.50',
    automaticCalculation: true,
    includeTaxes: true,
    defaultValidityPeriod: '30',
    
    // Utilisateurs autorisés
    users: [
      { id: 1, name: 'Jean Dupont', email: 'jean@masociete.fr', role: 'Admin' },
      { id: 2, name: 'Marie Martin', email: 'marie@masociete.fr', role: 'Technicien' },
      { id: 3, name: 'Paul Durant', email: 'paul@masociete.fr', role: 'Commercial' },
    ],
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: event.target.type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    setEditMode(false);
    // Implémenter la sauvegarde
    console.log('Saving settings:', formData);
  };

  const handleAddUser = () => {
    // Implémenter l'ajout d'utilisateur
  };

  const handleDeleteUser = (userId) => {
    setFormData((prev) => ({
      ...prev,
      users: prev.users.filter((user) => user.id !== userId),
    }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Paramètres
          </Typography>
          <Button
            variant="contained"
            startIcon={editMode ? <SaveIcon /> : <EditIcon />}
            onClick={editMode ? handleSave : () => setEditMode(true)}
          >
            {editMode ? 'Enregistrer' : 'Modifier'}
          </Button>
        </Box>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            mb: 3,
          }}
        >
          <Tab label="Entreprise" />
          <Tab label="Notifications" />
          <Tab label="Préférences CEE" />
          <Tab label="Utilisateurs" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mb: 2,
                }}
              />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="company-logo"
                type="file"
                disabled={!editMode}
              />
              <label htmlFor="company-logo">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<PhotoCamera />}
                  disabled={!editMode}
                >
                  Changer le logo
                </Button>
              </label>
            </Grid>
            <Grid item xs={12} md={9}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Nom de l'entreprise"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="SIRET"
                    name="siret"
                    value={formData.siret}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Adresse"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Ville"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Code postal"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Téléphone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Site web"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <List>
            <ListItem>
              <ListItemText
                primary="Notifications par email"
                secondary="Recevoir les notifications importantes par email"
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  name="emailNotifications"
                  checked={formData.emailNotifications}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Rappels de visite"
                secondary="Recevoir des rappels avant les visites programmées"
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  name="visitReminders"
                  checked={formData.visitReminders}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Notifications de rapport"
                secondary="Être notifié lors de la génération de nouveaux rapports"
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  name="reportNotifications"
                  checked={formData.reportNotifications}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Alertes d'échéance"
                secondary="Recevoir des alertes pour les échéances importantes"
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  name="deadlineAlerts"
                  checked={formData.deadlineAlerts}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Taux CEE par défaut (€/kWh cumac)"
                name="defaultCEERate"
                type="number"
                value={formData.defaultCEERate}
                onChange={handleChange}
                disabled={!editMode}
                inputProps={{ step: '0.01' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Période de validité par défaut (jours)"
                name="defaultValidityPeriod"
                type="number"
                value={formData.defaultValidityPeriod}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    name="automaticCalculation"
                    checked={formData.automaticCalculation}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                }
                label="Calcul automatique des CEE"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    name="includeTaxes"
                    checked={formData.includeTaxes}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                }
                label="Inclure les taxes dans les calculs"
              />
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Box sx={{ mb: 3 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddUser}
              disabled={!editMode}
            >
              Ajouter un utilisateur
            </Button>
          </Box>
          
          <List>
            {formData.users.map((user) => (
              <React.Fragment key={user.id}>
                <ListItem>
                  <Avatar sx={{ mr: 2 }}>{user.name[0]}</Avatar>
                  <ListItemText
                    primary={user.name}
                    secondary={
                      <React.Fragment>
                        {user.email}
                        <Chip
                          label={user.role}
                          size="small"
                          sx={{ ml: 1 }}
                          color={user.role === 'Admin' ? 'primary' : 'default'}
                        />
                      </React.Fragment>
                    }
                  />
                  {editMode && (
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={user.role === 'Admin'}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default Settings;
