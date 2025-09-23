const checkRole = (req, res, next) => {
    const userRole = req.user?.role; // get role from token

    if (!userRole) return res.status(403).json({ message: "Access denied!" });

    console.log(req.user)
    console.log(userRole)
    
    // If admin, allow everything
    if (userRole.includes("admin")) return next();

    // If not admin, deny access
    return res.status(403).json({ message: "You do not have permission." });
};

module.exports = checkRole;
