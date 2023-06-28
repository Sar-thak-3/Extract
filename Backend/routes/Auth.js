const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const {body,validationResult} = require("express-validator");
const User = require("../models/Users");
const fetchuser = require("../middleware/fetchuser");

router.post("/newuser",[
    body("email").exists(),
    body("password","Enter valid password").isLength({min: 6}),
],async(req,res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({success: false, error: "Invalid credentials"});
    }

    try{
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(500).json({success: false, error: "User with this email already exists"});
        }

        const salt = await bcrypt.genSalt(17);
        securePassword = await bcrypt.hash(req.body.password,salt);

        const fullname = req.body.firstname+" "+req.body.lastname;

        user = await User.create({
            fullname: fullname,
            email: req.body.email,
            password: securePassword,
        })

        const data = {
            user: user.id,
        }

        const authtoken = jsonwebtoken.sign(data,process.env.JWT_SECRET);

        res.status(200).json({success: true,authtoken: authtoken});

    }
    catch(error){
        console.log(error);
        res.status(400).json({success: false,error: "Internal Server error"});
    }
});

router.post("/loginuser",[
    body("email","Enter valid email").exists().isEmail(),
    body("password","Enter valid credentials").exists().isLength({min: 6}),
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success: false,error: "Invalid credentials"});
    }

    const {email,password} = req.body;
    
    try{
        console.log("run")
        let user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({success: false, error: "Invalid credentials"});
        }
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({success: false,error: "Invalid credentials"});
        }

        const data = {
            user: user.id,
        }

        const authtoken = jsonwebtoken.sign(data,process.env.JWT_SECRET);

        res.status(201).json({success: true,authtoken: authtoken});
    }
    catch(error){
        console.log(error);
        res.status(400).json({success: false,error: "Internal server error"});
    }
});

router.get("/getuser",fetchuser,async(req,res)=>{
    if(!req.user){
        res.status(400).json({success: false,error: "User not found"});
    }
    try{
        const user = await User.findById(req.user);
        if(!user){
            res.status(400).json({success: false,error: "User not found"});
        }
        res.status(200).json({success: true,fullname: user.fullname,about: user.about});
    }
    catch(error){
        console.log(error);
        res.status(400).json({success: false,error: "Internal server error"});
    }
})

router.post("/updateuser" , fetchuser , async(req,res)=>{
    if(!req.user){
        res.status(400).json({success: false,error: "User not found"});
    }

    if(req.body.password && req.body.password.length<6){
        res.status(400).json({success: false,error: "Invalid date"});
    }
    try{
        let obj = {}
        console.log(req.body);
        if(req.body.fullname){
            obj["fullname"] = req.body.fullname;
        }
        if(req.body.about){
            obj["about"] = req.body.about;
        }
        if(req.body.password){
            const salt = await bcrypt.genSalt(17);
            securePassword = await bcrypt.hash(req.body.password,salt);
            obj["password"] = securePassword;
        }
        
        const user = await User.findOne({_id: req.user});
        if(!user){
            res.status(400).json({success: false,error: "User not found"});
        }
        const output = await User.findOneAndUpdate({_id: req.user},{$set: obj});

        // console.log(output);

        res.status(200).json({success: true,message: "User updated successfully"});
    }
    catch(error){
        console.log(error);
        res.status(400).json({success: false,error: "Internal server error"});
    }
})

module.exports = router