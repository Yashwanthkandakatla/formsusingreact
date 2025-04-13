const jwt = require("jsonwebtoken");
const verifytoken = (req,res,next)=>{
    let token;
    let authheader = req.headers.authorization|| req.headers.Authorization;
    if(authheader && authheader.startsWith("Bearer")){
        token = authheader.split(" ")[1];
        // token = authheader.slice(6)
        console.log("Token recieved",token);
        if(!token){
            return res.status(401).json({message:"No token is present,denied"});
        }
        try{
                const decode = jwt.verify(token,process.env.JWT_SECRET);
                req.user = decode;
                console.log("The decoded user is : ",req.user);
                return next();
        }catch(err){
            console.error("JWT VErification errror ",err.message);
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token expired" });
              } else if (err.name === "JsonWebTokenError") {
                return res.status(400).json({ message: "Invalid token" });
              }
            // return res.status(400).json({message:"Token is not valid"});
        }
    }else{
        return res.status(401).json({message:"Missing token in the header"});
    }
};

module.exports = verifytoken;