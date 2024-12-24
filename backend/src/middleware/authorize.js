const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: 'Non authentifié'
      });
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Non autorisé'
      });
    }

    // Pour les CLIENT_ADMIN, vérifier qu'ils accèdent uniquement aux données de leur client
    if (req.user.role === 'CLIENT_ADMIN') {
      if (req.params.clientId && req.params.clientId !== req.user.clientId) {
        return res.status(403).json({
          message: 'Non autorisé à accéder aux données d\'un autre client'
        });
      }
    }

    next();
  };
};

module.exports = authorize;
