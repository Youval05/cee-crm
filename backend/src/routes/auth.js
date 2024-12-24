const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const validate = require('../middleware/validate');

const router = express.Router();

// Validation des champs pour l'inscription
const registerValidation = [
  body('email').isEmail().withMessage('Email invalide'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Le mot de passe doit contenir au moins 8 caractères'),
  body('firstName').notEmpty().withMessage('Le prénom est requis'),
  body('lastName').notEmpty().withMessage('Le nom est requis'),
  body('role').isIn(['ADMIN', 'CLIENT_ADMIN', 'TECHNICIAN'])
    .withMessage('Rôle invalide')
];

// Validation des champs pour la connexion
const loginValidation = [
  body('email').isEmail().withMessage('Email invalide'),
  body('password').notEmpty().withMessage('Mot de passe requis')
];

// Routes d'authentification
router.post('/register', registerValidation, validate, authController.register);
router.post('/login', loginValidation, validate, authController.login);
router.post('/forgot-password', 
  body('email').isEmail().withMessage('Email invalide'),
  validate,
  authController.forgotPassword
);
router.post('/reset-password', 
  body('token').notEmpty().withMessage('Token requis'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Le mot de passe doit contenir au moins 8 caractères'),
  validate,
  authController.resetPassword
);

module.exports = router;
