
const jwt = require('jsonwebtoken'); 


const  authorizeAdmin = async (req, res, next)=> {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Unauthorized: Missing access token' });
  }

  const token = authHeader.split(' ')[1];

        try {
            const decoded =await jwt.verify(token, "Ajay@314"); 

            if (!decoded.isAdmin) {
                return res.status(403).json({ message: 'Forbidden: Access denied for non-admin users' });
            }

            req.user = decoded; 
            next(); 
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
    }

    module.exports = { authorizeAdmin } ;