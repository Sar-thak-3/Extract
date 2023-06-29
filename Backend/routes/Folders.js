const express = require("express");
const router = express.Router();
const Folders = require("../models/Folders");
const fetchuser = require("../middleware/fetchuser");
const fetchfolder = require("../middleware/fetchfolder");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

router.post("/newfolder",fetchuser,async(req,res)=>{
    if(!req.user){
        res.status(400).json({success: false,error: "User not found"});
    }

    try{
        const {foldername,public} = req.body;
        console.log(foldername);
        const folder = await Folders.create({
            user: req.user,
            foldername: foldername,
            public: public,
        });

        const data = {
            folderid: folder.id,
        }

        const foldertoken = jwt.sign(data,process.env.FOLDER_JWT_SECRET);
        console.log(foldertoken);

        res.status(200).json({success: true,foldertoken: foldertoken,message: "Folder successfully created"})
    }
    catch(error){
        console.log(error);
        res.status(400).json({success: false,error: "Internal server error"});
    }
});

router.get("/userfolderimages",fetchuser,fetchfolder,async(req,res)=>{
    if(!req.user || !req.folderid){
        console.log(req.folderid);
        res.status(400).json({success: false, error: "Invalid User of folder"});
    }
    try{
        const response = await Folders.findById(req.folderid).limit(20);
        if(!response){
            res.status(400).json({success: false,error: "Invalid Folder"});
        }
        res.status(200).json({success: true,images: response.images});
    }
    catch(error){
        console.log(error);
        res.status(400).json({success: false, error: "Internal server error"});
    }
})

router.get("/userfolders",fetchuser,async(req,res)=>{
    const query = req.query;

    if(!req.user){
        res.status(400).json({success: false,error: "User not found"});
    }

    try{
        let pagenumber;
        if(query.pagenumber){
            pagenumber = query.pagenumber;
        }
        else{
            pagenumber = 1;
        }
        const folders = await Folders.find({user: req.user}).sort({date: 1}).skip((pagenumber-1)*20).limit(20);

        let allfolders = []
        Object.entries(folders).map((folder)=>{
            let folderdata = {
                folderid: folder[1]._id,
            }
            let foldertoken = jwt.sign(folderdata,process.env.FOLDER_JWT_SECRET);
            allfolders.push({foldername: folder[1].foldername , public: folder[1].public,foldertoken: foldertoken})
        })

        res.status(200).json({success: true,folders:allfolders});
    }
    catch(error){
        console.log(error);
        res.status(400).json({success: false,error: "Internal server error"});
    }
});

router.post("/addimage",fetchuser,fetchfolder,async(req,res)=>{
    if(!req.user || !req.folderid){
        res.status(400).json({success: false,error: "Folder not found"});
    }

    try{
        // console.log(req.folderid);
        const folder = await Folders.findOne({_id: req.folderid});
        // console.log(folder)
        if(!folder || req.user!==folder.user.toString()){
            res.status(400).json({success: false,error: "No such folder exists"});
        }
        const newdata = [{
            image: req.body.image,
            extracted: req.body.extracted,
        }];
        
        const update = await Folders.findByIdAndUpdate(req.folderid,{$push: {"images": newdata}},{upsert: true,new: true});
        console.log(update);

        res.status(200).json({success: true,message: "New Image added to folder"});
    }
    catch(error){
        console.log(error);
        res.status(400).json({success: false,error: "Internal server error"});
    }
});

router.post("/answer",async(req,res)=>{
    try{
        const {answerId} = req.body;
        // const answer = await Folders.aggregate([{$unwind: "$images"},{$match: {"images._id": answerId}}]);
        const answer = await Folders.findOne({"images": {$elemMatch: {"_id": answerId}}});

        if(!answer || answer.length===0){
            res.status(400).json({success: false,error: "No answer with such Id exists"});
            return;
        }

        const output = answer.images.find((image)=>{
            return image._id.toString()===answerId.toString()
        });
        
        res.status(200).json({success: true,answer: output});
    }
    catch(error){
        console.log(error);
        res.status(400).json({success: false,error: "Internal server error"});
    }
})

router.get("/allanswers",async(req,res)=>{

    const query = req.query;
    console.log(query);

    if(req.header("authtoken")){
        const token = req.header("authtoken");
        const data = jwt.verify(token,process.env.JWT_SECRET);
        req.user = data.user;
    }

    try{
        // const answers = await Folders.find().sort({images: {date: 1}}).skip((query.pagenumber-1)*20).limit(20);
        let output = [];
        if(req.user){
            const ans = await Folders.aggregate([{$match: {"user": new ObjectId(req.user)}},{$unwind: "$images"}]);
            let answers = []
            ans.forEach((an)=>{
                answers.push(an.images);
            })
            answers.sort((a,b)=>{
                return b.date - a.date;
            })
            output = answers.slice((query.pagenumber-1)*20,(query.pagenumber)*20)
        }
        else{
            let answers;
            answers = await Folders.aggregate([{$unwind: "$images"},{$set: {"images.date": {$toDate: "$images.date"}}},{"$sort": {"images.date": -1}}]).skip((query.pagenumber-1)*20).limit(20);
            output = []
            Object.entries(answers).map((ans)=>{
                output.push(ans[1].images);
            })
        }
        
        res.status(200).json({success: true,answers: output});
    }
    catch(error){
        console.log(error);
        res.status(400).json({success: false,error: "Internal server error"});
    }
})

router.post("/changepublic" , fetchuser, fetchfolder , async(req,res)=>{
    if(!req.user || !req.folderid){
        res.status(400).json({success: false,error: "Invalid User or Folder Id"});
        return;
    }
    try{
        const response = await Folders.findById(req.folderid);
        if(!response || req.user!==response.user.toString()){
            res.status(400).json({success: false, error: "Invalid Folder Id"});
            return;
        }
        const resp = await Folders.findByIdAndUpdate(req.folderid,{public: !response.public});

        res.status(200).json({success: true, message: "Public updated successfully"});
    }
    catch(error){
        console.log(error);
        res.status(400).json({success: false, error: "Internal server error"});
    }
})

module.exports = router;