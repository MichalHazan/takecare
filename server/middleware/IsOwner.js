const IsOwner = (req, res, next) => {
    const { id } = req.params;  //
    const userIdFromToken = req.userId;  //

    if (userIdFromToken !== id) {
        return res.status(403).json({ message: 'Only the authenticated user is authorized to perform this action' });
    }

    next();
};

module.exports = IsOwner;
