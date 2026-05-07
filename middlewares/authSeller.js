import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
  try {
    const { sellerToken } = req.cookies;

    if (!sellerToken) {
      return res.status(401).json({ success: false, message: "Seller not authorized" });
    }


    const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);
    if (tokenDecode?.email && tokenDecode.email === process.env.SELLER_EMAIL) {
    
    next();
    } else {
      return res.json({ success: false, message: "Invalid seller credentials" });
    }
  } catch (error) {
 
    return res.json({ success: false, message: "Unauthorized or invalid token" });
  }
};

export default authSeller;
