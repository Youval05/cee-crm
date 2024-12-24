import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Chip,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EuroIcon from '@mui/icons-material/Euro';

const mockVisitData = {
  client: {
    nom: 'Dupont',
    prenom: 'Martin',
    telephone: '06 12 34 56 78',
    email: 'martin.dupont@email.com',
    adresse: '15 rue de la Paix',
    codePostal: '75001',
    ville: 'Paris',
  },
  logement: {
    type: 'Maison individuelle',
    anneeConstruction: '1985',
    surfaceHabitable: '120',
    nombreOccupants: '4',
    modeChauffage: 'Individuel',
    energieChauffage: 'Gaz',
  },
  criteres: {
    isolation: {
      murs: true,
      combles: true,
      sousSol: false,
    },
    vitrage: 'Double vitrage',
    ventilation: 'VMC Simple flux',
  },
  eligibilite: {
    revenusFiscaux: '32000',
    nombreParts: '3',
    proprietaire: 'Oui',
    aidePrecedente: 'Non',
    resultat: 'Éligible',
    gainEnergetique: '35%',
    montantEstime: '4500',
  },
  visite: {
    date: '24/12/2024',
    technicien: 'Jean Martin',
    statut: 'Planifiée',
    reference: 'VT-2024-001',
  }
};

const VisitPreview = ({ open, onClose }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: '80vh',
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        bgcolor: 'primary.main',
        color: 'white',
      }}>
        <Typography variant="h6">
          Aperçu de la visite - {mockVisitData.visite.reference}
        </Typography>
        <Box>
          <IconButton size="small" onClick={onClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {/* En-tête avec actions */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Chip
              label={mockVisitData.visite.statut}
              color="primary"
              sx={{ mr: 1 }}
            />
            <Chip
              label={`Technicien: ${mockVisitData.visite.technicien}`}
              variant="outlined"
            />
          </Box>
          <Box>
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton>
              <PrintIcon />
            </IconButton>
            <IconButton>
              <ShareIcon />
            </IconButton>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* Informations client */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <PersonIcon color="primary" />
                Informations client
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" sx={{ fontWeight: 600 }}>Nom complet</TableCell>
                      <TableCell>{mockVisitData.client.prenom} {mockVisitData.client.nom}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" sx={{ fontWeight: 600 }}>Téléphone</TableCell>
                      <TableCell>{mockVisitData.client.telephone}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" sx={{ fontWeight: 600 }}>Email</TableCell>
                      <TableCell>{mockVisitData.client.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" sx={{ fontWeight: 600 }}>Adresse</TableCell>
                      <TableCell>
                        {mockVisitData.client.adresse}<br />
                        {mockVisitData.client.codePostal} {mockVisitData.client.ville}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Informations logement */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <HomeIcon color="primary" />
                Détails du logement
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" sx={{ fontWeight: 600 }}>Type</TableCell>
                      <TableCell>{mockVisitData.logement.type}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" sx={{ fontWeight: 600 }}>Surface</TableCell>
                      <TableCell>{mockVisitData.logement.surfaceHabitable} m²</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" sx={{ fontWeight: 600 }}>Année construction</TableCell>
                      <TableCell>{mockVisitData.logement.anneeConstruction}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" sx={{ fontWeight: 600 }}>Chauffage</TableCell>
                      <TableCell>
                        {mockVisitData.logement.modeChauffage} - {mockVisitData.logement.energieChauffage}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Critères techniques */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <AssignmentIcon color="primary" />
                Critères techniques
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Isolation</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip 
                    label="Murs" 
                    color={mockVisitData.criteres.isolation.murs ? "success" : "default"}
                    size="small"
                  />
                  <Chip 
                    label="Combles" 
                    color={mockVisitData.criteres.isolation.combles ? "success" : "default"}
                    size="small"
                  />
                  <Chip 
                    label="Sous-sol" 
                    color={mockVisitData.criteres.isolation.sousSol ? "success" : "default"}
                    size="small"
                  />
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" sx={{ fontWeight: 600 }}>Vitrage</TableCell>
                      <TableCell>{mockVisitData.criteres.vitrage}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" sx={{ fontWeight: 600 }}>Ventilation</TableCell>
                      <TableCell>{mockVisitData.criteres.ventilation}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Résultats éligibilité */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <EuroIcon color="primary" />
                Éligibilité CEE
              </Typography>
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip 
                  label={mockVisitData.eligibilite.resultat}
                  color={mockVisitData.eligibilite.resultat === 'Éligible' ? 'success' : 'error'}
                  sx={{ fontSize: '1rem', py: 2 }}
                />
                <Typography variant="h5" color="success.main" sx={{ fontWeight: 600 }}>
                  {mockVisitData.eligibilite.montantEstime} €
                </Typography>
              </Box>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" sx={{ fontWeight: 600 }}>Revenus fiscaux</TableCell>
                      <TableCell>{mockVisitData.eligibilite.revenusFiscaux} €</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" sx={{ fontWeight: 600 }}>Parts fiscales</TableCell>
                      <TableCell>{mockVisitData.eligibilite.nombreParts}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" sx={{ fontWeight: 600 }}>Gain énergétique</TableCell>
                      <TableCell>{mockVisitData.eligibilite.gainEnergetique}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* Actions */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Fermer
          </Button>
          <Button 
            variant="contained" 
            sx={{ 
              bgcolor: '#00ca72',
              '&:hover': { bgcolor: '#00a65d' }
            }}
          >
            Générer le rapport
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default VisitPreview;
