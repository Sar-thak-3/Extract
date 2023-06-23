const express = require("express");
const {body,validationResult} = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Question = require("../models/Questions");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/newquestion",fetchuser,[
    body("questiontitle","Enter valid question").exists(),
    body("questiondescription","Enter valid question").exists(),
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(req.body)
        return res.status(400).json({success: false,error: "Error in question"});
    }

    try{
        let {questiontitle,questiondescription,questiontags} = req.body;
        if(!req.user){
            return res.status(400).json({success: false,error: "User not found"})
        }
        const question = await Question.create({
            user: req.user,
            title: questiontitle,
            tags: questiontags,
            answered: false,
            description: questiondescription,
        });

        res.status(201).json({success: true, message: "Question successfully added"});
    }
    catch(error){
        console.log(error);
        res.status(400).json({success: false, error: "Internal server error"});
    }
})

router.get("/allquestions",async(req,res)=>{
    const query = req.query;
    console.log(query);

    if(req.header("authtoken")){
        const token = req.header("authtoken");
        const data = jwt.verify(token,process.env.JWT_SECRET);
        req.user = data.user;
    }

    try{
        let qs;
        if(req.user){
            if(query.required==="unanswered"){
                qs = await Question.find({user: req.user,answered: false}).sort({date: 1}).skip((query.pagenumber-1)*20).limit(20);
            }
            else if(query.required==="answered"){
                qs = await Question.find({user: req.user,answered: true}).sort({date: 1}).skip((query.pagenumber-1)*20).limit(20);
            }
            else{
                qs = await Question.find({user: req.user}).sort({date: 1}).skip((query.pagenumber-1)*20).limit(20);
            }
            res.status(200).json({success:true,questions: qs});
            return;
        }
        else{
            if(query.required==="unanswered"){
                qs = await Question.find({answered: false}).sort({date: 1}).skip((query.pagenumber-1)*20).limit(20);
            }
            else if(query.required==="answered"){
                qs = await Question.find({answered: true}).sort({date: 1}).skip((query.pagenumber-1)*20).limit(20);
            }
            else{
                qs = await Question.find().sort({date: 1}).skip((query.pagenumber-1)*20).limit(20);
            }
            res.status(200).json({success:true,questions: qs});
        }
    }
    catch(error){
        console.log(error);
        res.status(400).json({success: false,error: "Internal server error"});
    }
});

router.get("/userquestions",fetchuser,async(req,res)=>{
    const query = req.query;
    console.log(query);

    try{
        let qs;

        if(query.required==="unanswered"){
            qs = await Question.find({user: req.user,answered: false}).sort({date: 1}).skip((query.pagenumber-1)*20).limit(20);
        }
        else if(query.required==="answered"){
            qs = await Question.find({user: req.user,answered: true}).sort({date: 1}).skip((query.pagenumber-1)*20).limit(20);
        }
        else{
            qs = await Question.find({user: req.user}).sort({date: 1}).skip((query.pagenumber-1)*20).limit(20);
        }

        res.status(200).json({success: true,questions: qs});
    }
    catch(error){
        console.log(error);
        res.status(400).json({success: false,error: "Internal server error"});
    }
});

router.post("/question",async(req,res)=>{
    try{
        const {id} = req.body;
        const question = await Question.findOne({_id: id});

        if(!question){
            res.status(400).json({success: false,error: "Invalid question Id"});
            return;
        }
        res.status(200).json({success: true,question: question});
        return;
    }
    catch(error){
        console.log(error);
        res.status(400).json({success: false,error: "Internal server error"});
    }
})

module.exports = router