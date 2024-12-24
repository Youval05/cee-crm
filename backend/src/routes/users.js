const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const validate = require('../middleware/validate');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Validation pour la mise à jour d'un utilisateur
const updateValidation = [
  body('email').optional().isEmail().withMessage('Email invalide'),
  body('firstName').optional().notEmpty().withMessage('Le prénom est requis'),
  body('lastName').optional().notEmpty().withMessage('Le nom est requis'),
  body('role').optional().isIn(['ADMIN', 'CLIENT_ADMIN', 'TECHNICIAN'])
    .withMessage('Rôle invalide')
];

// Routes protégées par l'authentification et les autorisations
router.get('/', authorize(['ADMIN', 'CLIENT_ADMIN']), userController.getAllUsers);
router.get('/:id', authorize(['ADMIN', 'CLIENT_ADMIN']), userController.getUser);
router.put('/:id', 
  authorize(['ADMIN', 'CLIENT_ADMIN']),
  updateValidation,
  validate,
  userController.updateUser
);
router.delete('/:id', authorize(['ADMIN']), userController.deleteUser);

// Route pour mettre à jour son propre profil
router.put('/profile/update',
  updateValidation,
  validate,
  userController.updateProfile
);

// Route pour changer son mot de passe
router.put('/profile/password',
  [
    body('currentPassword').notEmpty().withMessage('Mot de passe actuel requis'),
    body('newPassword')
      .isLength({ min: 8 })
      .withMessage('Le nouveau mot de passe doit contenir au moins 8 caractères')
  ],
  validate,
  userController.changePassword
);

module.exports = router;
