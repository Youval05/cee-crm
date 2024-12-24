const { Prisma } = require('@prisma/client');

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        return res.status(409).json({
          message: 'Une entrée avec ces données existe déjà'
        });
      case 'P2025':
        return res.status(404).json({
          message: 'Ressource non trouvée'
        });
      default:
        return res.status(400).json({
          message: 'Erreur de base de données',
          error: err.message
        });
    }
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Erreur de validation',
      errors: err.errors
    });
  }

  return res.status(500).json({
    message: 'Erreur serveur interne',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

module.exports = errorHandler;
