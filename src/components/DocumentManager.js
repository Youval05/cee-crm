import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Divider,
} from '@mui/material';
import {
  Description as DescriptionIcon,
  Upload as UploadIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Edit as EditIcon,
  Check as CheckIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

const documentTypes = {
  technique: {
    label: 'Documents techniques',
    required: [
      'Devis détaillé des travaux',
      'Attestation sur l\'honneur',
      'Fiche technique des équipements',
      'Photos avant travaux',
      'Photos après travaux',
    ],
  },
  administratif: {
    label: 'Documents administratifs',
    required: [
      'KBIS',
      'RIB',
      'Mandat CEE',
      'Attestation TVA',
    ],
  },
  energie: {
    label: 'Justificatifs énergétiques',
    required: [
      'Factures d\'énergie (12 derniers mois)',
      'Audit énergétique',
      'Rapport de conformité',
    ],
  },
};

const DocumentManager = () => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [documents, setDocuments] = useState({
    technique: [],
    administratif: [],
    energie: [],
  });

  const handleUpload = (type, fileName) => {
    setDocuments(prev => ({
      ...prev,
      [type]: [...prev[type], {
        name: fileName,
        date: new Date().toLocaleDateString(),
        status: 'pending',
      }],
    }));
    setUploadDialogOpen(false);
  };

  const handleDelete = (type, index) => {
    setDocuments(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const getCompletionStatus = (type) => {
    const required = documentTypes[type].required.length;
    const uploaded = documents[type].length;
    return Math.round((uploaded / required) * 100);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {Object.entries(documentTypes).map(([type, { label, required }]) => (
          <Grid item xs={12} md={4} key={type}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">{label}</Typography>
                <Chip
                  label={`${getCompletionStatus(type)}%`}
                  color={getCompletionStatus(type) === 100 ? 'success' : 'warning'}
                />
              </Box>
              
              <List>
                {documents[type].map((doc, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      bgcolor: 'background.default',
                      borderRadius: 1,
                      mb: 1,
                    }}
                  >
                    <ListItemIcon>
                      <DescriptionIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={doc.name}
                      secondary={doc.date}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="download"
                        sx={{ mr: 1 }}
                      >
                        <DownloadIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDelete(type, index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Documents requis :
              </Typography>
              <List dense>
                {required.map((doc, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      {documents[type].length > index ? (
                        <CheckIcon color="success" />
                      ) : (
                        <WarningIcon color="warning" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={doc}
                      primaryTypographyProps={{
                        variant: 'body2',
                        color: documents[type].length > index ? 'text.primary' : 'text.secondary',
                      }}
                    />
                  </ListItem>
                ))}
              </List>

              <Button
                variant="outlined"
                startIcon={<UploadIcon />}
                fullWidth
                onClick={() => {
                  setSelectedType(type);
                  setUploadDialogOpen(true);
                }}
                sx={{ mt: 2 }}
              >
                Ajouter un document
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Ajouter un document
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Nom du fichier"
              fullWidth
              variant="outlined"
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Types de fichiers acceptés : PDF, JPG, PNG
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>
            Annuler
          </Button>
          <Button
            variant="contained"
            onClick={() => handleUpload(selectedType, 'Document test.pdf')}
          >
            Téléverser
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DocumentManager;
