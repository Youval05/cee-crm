const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

const authController = {
  // Inscription d'un nouvel utilisateur
  async register(req, res, next) {
    try {
      const { email, password, firstName, lastName, role, clientId } = req.body;

      // Vérifier si l'utilisateur existe déjà
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        return res.status(409).json({
          message: 'Un utilisateur avec cet email existe déjà'
        });
      }

      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 12);

      // Créer l'utilisateur
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          role,
          clientId
        }
      });

      // Générer le token
      const token = generateToken(user.id);

      res.status(201).json({
        message: 'Utilisateur créé avec succès',
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // Connexion d'un utilisateur
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      // Rechercher l'utilisateur
      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          client: true
        }
      });

      if (!user) {
        return res.status(401).json({
          message: 'Email ou mot de passe incorrect'
        });
      }

      // Vérifier le mot de passe
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({
          message: 'Email ou mot de passe incorrect'
        });
      }

      // Générer le token
      const token = generateToken(user.id);

      res.json({
        message: 'Connexion réussie',
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          client: user.client ? {
            id: user.client.id,
            name: user.client.name
          } : null
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // Demande de réinitialisation du mot de passe
  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;

      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        return res.status(404).json({
          message: 'Aucun utilisateur trouvé avec cet email'
        });
      }

      // Générer un token de réinitialisation
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 heure

      await prisma.user.update({
        where: { id: user.id },
        data: {
          resetToken,
          resetTokenExpiry
        }
      });

      // TODO: Envoyer l'email avec le token de réinitialisation

      res.json({
        message: 'Instructions de réinitialisation envoyées par email'
      });
    } catch (error) {
      next(error);
    }
  },

  // Réinitialisation du mot de passe
  async resetPassword(req, res, next) {
    try {
      const { token, password } = req.body;

      const user = await prisma.user.findFirst({
        where: {
          resetToken: token,
          resetTokenExpiry: {
            gt: new Date()
          }
        }
      });

      if (!user) {
        return res.status(400).json({
          message: 'Token invalide ou expiré'
        });
      }

      // Hasher le nouveau mot de passe
      const hashedPassword = await bcrypt.hash(password, 12);

      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          resetToken: null,
          resetTokenExpiry: null
        }
      });

      res.json({
        message: 'Mot de passe réinitialisé avec succès'
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = authController;
