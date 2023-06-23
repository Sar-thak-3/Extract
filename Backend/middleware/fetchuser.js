const jwt = require("jsonwebtoken");

const fetchuser = (req,res,next)=>{
    const token = req.header("authtoken");
    if(!token){
        res.status(401).send({success: false, error: "User not found"});
    }

    try{
        const data = jwt.verify(token,process.env.JWT_SECRET);
        req.user = data.user;
        next();
    }   
    catch(error){
        console.log(error);
        res.status(401).json({success: false,error: "Internal server error"});
    }
}

module.exports = fetchuser;