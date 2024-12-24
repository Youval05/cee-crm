import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  IconButton,
  Stack,
} from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import fr from 'date-fns/locale/fr';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const VisitForm = ({ mode = 'create' }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    client: '',
    address: '',
    date: new Date(),
    type: '',
    surface: '',
    contact: '',
    phone: '',
    email: '',
    notes: '',
    photos: [],
  });
  const [errors, setErrors] = useState({});
  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';

  useEffect(() => {
    if (id && (isViewMode || isEditMode)) {
      // Ici, vous chargeriez les données de la visite depuis votre API
      // Pour l'instant, on simule avec des données vides
    }
  }, [id, isViewMode, isEditMode]);

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const handleDateChange = (newDate) => {
    setFormData({
      ...formData,
      date: newDate,
    });
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    setFormData({
      ...formData,
      photos: [...formData.photos, ...files],
    });
  };

  const handleRemovePhoto = (index) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      photos: newPhotos,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.client) newErrors.client = 'Le nom du client est requis';
    if (!formData.address) newErrors.address = 'L\'adresse est requise';
    if (!formData.type) newErrors.type = 'Le type de bâtiment est requis';
    if (!formData.surface) newErrors.surface = 'La surface est requise';
    if (!formData.contact) newErrors.contact = 'Le contact est requis';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    // Ici, vous enverriez les données à votre API
    console.log('Données du formulaire:', formData);
    navigate('/visites');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/visites')}
        sx={{ mb: 3 }}
      >
        Retour aux visites
      </Button>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          {isViewMode ? 'Détails de la visite' : isEditMode ? 'Modifier la visite' : 'Nouvelle visite'}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nom du client"
                value={formData.client}
                onChange={handleChange('client')}
                error={!!errors.client}
                helperText={errors.client}
                disabled={isViewMode}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
                <MobileDatePicker
                  label="Date de la visite"
                  value={formData.date}
                  onChange={handleDateChange}
                  disabled={isViewMode}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Adresse"
                value={formData.address}
                onChange={handleChange('address')}
                error={!!errors.address}
                helperText={errors.address}
                disabled={isViewMode}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.type} required>
                <InputLabel>Type de bâtiment</InputLabel>
                <Select
                  value={formData.type}
                  onChange={handleChange('type')}
                  disabled={isViewMode}
                >
                  <MenuItem value="commercial">Commercial</MenuItem>
                  <MenuItem value="industriel">Industriel</MenuItem>
                  <MenuItem value="bureaux">Bureaux</MenuItem>
                  <MenuItem value="residentiel">Résidentiel</MenuItem>
                </Select>
                {errors.type && <FormHelperText>{errors.type}</FormHelperText>}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Surface (m²)"
                type="number"
                value={formData.surface}
                onChange={handleChange('surface')}
                error={!!errors.surface}
                helperText={errors.surface}
                disabled={isViewMode}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nom du contact"
                value={formData.contact}
                onChange={handleChange('contact')}
                error={!!errors.contact}
                helperText={errors.contact}
                disabled={isViewMode}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Téléphone"
                value={formData.phone}
                onChange={handleChange('phone')}
                disabled={isViewMode}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                disabled={isViewMode}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={4}
                value={formData.notes}
                onChange={handleChange('notes')}
                disabled={isViewMode}
              />
            </Grid>

            {!isViewMode && (
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Photos
                </Typography>
                <input
                  accept="image/*"
                  id="photo-upload"
                  type="file"
                  multiple
                  onChange={handlePhotoUpload}
                  style={{ display: 'none' }}
                />
                <label htmlFor="photo-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<AddPhotoAlternateIcon />}
                  >
                    Ajouter des photos
                  </Button>
                </label>
              </Grid>
            )}

            {formData.photos.length > 0 && (
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: 'wrap', gap: 2 }}>
                  {formData.photos.map((photo, index) => (
                    <Box
                      key={index}
                      sx={{
                        position: 'relative',
                        width: 150,
                        height: 150,
                      }}
                    >
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Photo ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: 8,
                        }}
                      />
                      {!isViewMode && (
                        <IconButton
                          size="small"
                          onClick={() => handleRemovePhoto(index)}
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            bgcolor: 'background.paper',
                            '&:hover': { bgcolor: 'background.paper' },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Box>
                  ))}
                </Stack>
              </Grid>
            )}

            {!isViewMode && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/visites')}
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    {isEditMode ? 'Enregistrer les modifications' : 'Créer la visite'}
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default VisitForm;
