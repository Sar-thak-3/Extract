const jwt = require("jsonwebtoken")

const fetchfolder = (req,res,next)=>{
    const foldertoken = req.header("foldertoken");
    if(!foldertoken){
        res.status(401).send({success: false, error: "Folder not found"});
    }

    try{
        const data = jwt.verify(foldertoken,process.env.FOLDER_JWT_SECRET);
        req.folderid = data.folderid;
        next();
    }   
    catch(error){
        console.log(error);
        res.status(401).json({success: false,error: "Invalid folder token"});
    }
};

module.exports = fetchfolder;