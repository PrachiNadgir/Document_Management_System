const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.user = { _id: decoded.userId };

    next();
  } catch (error) { 
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

isAuth.protect = isAuth;

module.exports = isAuth;
