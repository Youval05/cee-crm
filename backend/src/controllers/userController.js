const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const userController = {
  // Récupérer tous les utilisateurs
  async getAllUsers(req, res, next) {
    try {
      const query = {
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          clientId: true,
          client: {
            select: {
              id: true,
              name: true
            }
          },
          createdAt: true,
          updatedAt: true
        }
      };

      // Si l'utilisateur est un CLIENT_ADMIN, filtrer par son clientId
      if (req.user.role === 'CLIENT_ADMIN') {
        query.where = {
          clientId: req.user.clientId
        };
      }

      const users = await prisma.user.findMany(query);

      res.json(users);
    } catch (error) {
      next(error);
    }
  },

  // Récupérer un utilisateur spécifique
  async getUser(req, res, next) {
    try {
      const { id } = req.params;

      const query = {
        where: { id },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          clientId: true,
          client: {
            select: {
              id: true,
              name: true
            }
          },
          createdAt: true,
          updatedAt: true
        }
      };

      // Vérifier les permissions pour CLIENT_ADMIN
      if (req.user.role === 'CLIENT_ADMIN') {
        query.where.clientId = req.user.clientId;
      }

      const user = await prisma.user.findFirst(query);

      if (!user) {
        return res.status(404).json({
          message: 'Utilisateur non trouvé'
        });
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  // Mettre à jour un utilisateur
  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { email, firstName, lastName, role, clientId } = req.body;

      // Vérifier si l'utilisateur existe
      const existingUser = await prisma.user.findUnique({
        where: { id }
      });

      if (!existingUser) {
        return res.status(404).json({
          message: 'Utilisateur non trouvé'
        });
      }

      // Vérifier les permissions pour CLIENT_ADMIN
      if (req.user.role === 'CLIENT_ADMIN' && existingUser.clientId !== req.user.clientId) {
        return res.status(403).json({
          message: 'Non autorisé à modifier cet utilisateur'
        });
      }

      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          email,
          firstName,
          lastName,
          role,
          clientId
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          clientId: true,
          client: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });

      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  },

  // Supprimer un utilisateur
  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      // Vérifier si l'utilisateur existe
      const user = await prisma.user.findUnique({
        where: { id }
      });

      if (!user) {
        return res.status(404).json({
          message: 'Utilisateur non trouvé'
        });
      }

      await prisma.user.delete({
        where: { id }
      });

      res.json({
        message: 'Utilisateur supprimé avec succès'
      });
    } catch (error) {
      next(error);
    }
  },

  // Mettre à jour son propre profil
  async updateProfile(req, res, next) {
    try {
      const { email, firstName, lastName } = req.body;
      const userId = req.user.id;

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          email,
          firstName,
          lastName
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          client: {
            select: {
              id: true,
              name: true
            }
          }
        }
      });

      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  },

  // Changer son mot de passe
  async changePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user.id;

      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      // Vérifier le mot de passe actuel
      const isValidPassword = await bcrypt.compare(currentPassword, user.password);
      if (!isValidPassword) {
        return res.status(400).json({
          message: 'Mot de passe actuel incorrect'
        });
      }

      // Hasher et mettre à jour le nouveau mot de passe
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await prisma.user.update({
        where: { id: userId },
        data: {
          password: hashedPassword
        }
      });

      res.json({
        message: 'Mot de passe modifié avec succès'
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = userController;
